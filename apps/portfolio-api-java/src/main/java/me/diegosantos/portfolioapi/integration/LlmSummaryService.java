package me.diegosantos.portfolioapi.integration;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.text.Normalizer;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class LlmSummaryService {

  public record LearningEnrichment(String summary, String technicalCategory, boolean needsReview) {
    public LearningEnrichment(String summary, String technicalCategory) {
      this(summary, technicalCategory, false);
    }
  }

  private static final Logger log = LoggerFactory.getLogger(LlmSummaryService.class);
  private static final String OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
  private static final String MODEL = "google/gemini-2.0-flash-001";
  private static final List<String> LOW_SIGNAL_TITLES =
      Arrays.asList(
          "develop", "main", "master", "release", "update", "updates", "changes", "change", "sync",
          "merge", "wip", "test", "tests", "ajuste", "ajustes");
  private static final List<String> DISALLOWED_SUMMARY_PHRASES =
      Arrays.asList(
          "nao possui descricao",
          "não possui descrição",
          "recomenda-se adicionar",
          "mudancas desconhecidas",
          "mudanças desconhecidas",
          "objetivo desconhecido");

  private final HttpClient httpClient;
  private final ObjectMapper objectMapper;

  @Value("${llm.api.key:}")
  private String llmApiKey;

  public LlmSummaryService(ObjectMapper objectMapper) {
    this.httpClient = HttpClient.newHttpClient();
    this.objectMapper = objectMapper;
  }

  public LearningEnrichment enrich(String title, String body) {
    String fallbackCategory = inferTechnicalCategory(title, body);
    boolean needsReview = requiresManualReview(title, body);
    String fallbackSummary = buildFallbackSummary(title, body, needsReview);

    if (llmApiKey == null || llmApiKey.isBlank()) {
      log.warn("LLM_API_KEY não configurada. Retornando título e categoria inferida localmente.");
      return new LearningEnrichment(fallbackSummary, fallbackCategory, needsReview);
    }

    String prompt =
        """
                Você é um assistente técnico de um portfólio de engenharia de software.
                Analise o seguinte Pull Request e gere um artefato JSON com duas chaves:
                - "summary": resumo técnico conciso em português, em no máximo 3 frases curtas.
                - "technicalCategory": categoria técnica curta e legível, como backend, frontend, infra, database, observability, ai, ci-cd ou quality.

                Regras:
                - Responda apenas JSON válido.
                - Não use markdown.
                - Não invente informação ausente.
                - Não escreva frases como "o pull request não possui descrição", "mudanças desconhecidas" ou "objetivo desconhecido".
                - Se houver pouco contexto, produza um resumo neutro, profissional e conservador.
                - Nunca transforme ausência de descrição em bronca de revisão.

                Título: %s

                Descrição: %s
                """
            .formatted(title, body == null || body.isBlank() ? "Sem descrição." : body);

    String requestBody =
        """
                {
                  "model": "%s",
                  "messages": [
                    {"role": "user", "content": %s}
                  ]
                }
                """
            .formatted(MODEL, objectMapper.valueToTree(prompt).toString());

    try {
      HttpRequest request =
          HttpRequest.newBuilder()
              .uri(URI.create(OPENROUTER_URL))
              .header("Authorization", "Bearer " + llmApiKey)
              .header("Content-Type", "application/json")
              .header("HTTP-Referer", "https://github.com/diegosantos-ai/diego-santos-me")
              .POST(HttpRequest.BodyPublishers.ofString(requestBody))
              .build();

      HttpResponse<String> response =
          httpClient.send(request, HttpResponse.BodyHandlers.ofString());

      if (response.statusCode() != 200) {
        log.error("Erro na chamada ao LLM. Status: {}", response.statusCode());
        return new LearningEnrichment(fallbackSummary, fallbackCategory, needsReview);
      }

      JsonNode root = objectMapper.readTree(response.body());
      String content = root.path("choices").path(0).path("message").path("content").asText("");
      return parseEnrichmentContent(content, fallbackSummary, fallbackCategory, needsReview);

    } catch (Exception e) {
      log.error("Falha ao chamar LLM: {}", e.getMessage());
      return new LearningEnrichment(fallbackSummary, fallbackCategory, needsReview);
    }
  }

  private LearningEnrichment parseEnrichmentContent(
      String content, String fallbackSummary, String fallbackCategory, boolean needsReview) {
    String cleanedContent = stripMarkdownFences(content);

    try {
      JsonNode node = objectMapper.readTree(cleanedContent);
      String summary = node.path("summary").asText("").trim();
      String technicalCategory = node.path("technicalCategory").asText("").trim();

      if (summary.isBlank()) {
        summary = fallbackSummary;
      }

      if (technicalCategory.isBlank()) {
        technicalCategory = fallbackCategory;
      }

      summary = sanitizeSummary(summary, fallbackSummary);
      return new LearningEnrichment(summary, technicalCategory, needsReview);
    } catch (Exception e) {
      log.warn("Resposta do LLM fora do formato JSON esperado. Aplicando fallback local.");
      return new LearningEnrichment(
          sanitizeSummary(
              cleanedContent.isBlank() ? fallbackSummary : cleanedContent, fallbackSummary),
          fallbackCategory,
          needsReview);
    }
  }

  private String stripMarkdownFences(String value) {
    String trimmed = value == null ? "" : value.trim();

    if (trimmed.startsWith("```")) {
      trimmed = trimmed.replaceFirst("^```[a-zA-Z]*\\n?", "");
      trimmed = trimmed.replaceFirst("\\n?```$", "");
    }

    return trimmed.trim();
  }

  private String inferTechnicalCategory(String title, String body) {
    String source = (title + " " + body).toLowerCase(Locale.ROOT);
    Map<String, String[]> rules = new LinkedHashMap<>();

    rules.put(
        "observability",
        new String[] {"grafana", "prometheus", "loki", "promtail", "observability", "alert"});
    rules.put(
        "infra",
        new String[] {
          "terraform", "aws", "docker", "nginx", "compose", "vps", "deploy", "kubernetes"
        });
    rules.put(
        "ci-cd", new String[] {"github actions", "workflow", "pipeline", "ci", "cd", "release"});
    rules.put(
        "database",
        new String[] {"postgres", "sql", "jpa", "flyway", "migration", "database", "query"});
    rules.put(
        "ai",
        new String[] {"llm", "rag", "openai", "prompt", "ai", "ia", "langchain", "langgraph"});
    rules.put(
        "frontend",
        new String[] {"next.js", "nextjs", "react", "frontend", "ui", "page.tsx", "css"});
    rules.put(
        "backend",
        new String[] {"spring", "fastapi", "backend", "api", "controller", "endpoint", "java"});
    rules.put(
        "quality",
        new String[] {"test", "lint", "prettier", "eslint", "spotless", "refactor", "coverage"});

    for (Map.Entry<String, String[]> rule : rules.entrySet()) {
      for (String keyword : rule.getValue()) {
        if (source.contains(keyword)) {
          return rule.getKey();
        }
      }
    }

    return "engineering";
  }

  private boolean requiresManualReview(String title, String body) {
    if (body != null && !body.isBlank()) {
      return false;
    }

    String normalizedTitle = normalize(title);
    if (normalizedTitle.isBlank()) {
      return true;
    }

    if (LOW_SIGNAL_TITLES.contains(normalizedTitle)) {
      return true;
    }

    return normalizedTitle.split("\\s+").length <= 2 && normalizedTitle.length() <= 14;
  }

  private String buildFallbackSummary(String title, String body, boolean needsReview) {
    if (needsReview) {
      return "Registro criado a partir de um merge com pouco contexto no Pull Request. O item foi mantido para curadoria manual antes de ganhar destaque publico no journal.";
    }

    if (body == null || body.isBlank()) {
      return "Atualizacao integrada ao repositorio com contexto limitado no Pull Request. O resumo foi mantido conservador para evitar interpretar mudancas alem do que o registro permite afirmar.";
    }

    return title == null || title.isBlank()
        ? "Atualizacao tecnica registrada no repositorio."
        : title;
  }

  private String sanitizeSummary(String summary, String fallbackSummary) {
    String trimmedSummary = summary == null ? "" : summary.trim();
    if (trimmedSummary.isBlank()) {
      return fallbackSummary;
    }

    String normalizedSummary = normalize(trimmedSummary);
    for (String disallowed : DISALLOWED_SUMMARY_PHRASES) {
      if (normalizedSummary.contains(normalize(disallowed))) {
        return fallbackSummary;
      }
    }

    return trimmedSummary;
  }

  private String normalize(String value) {
    String normalized = value == null ? "" : value.trim().toLowerCase(Locale.ROOT);
    normalized = Normalizer.normalize(normalized, Normalizer.Form.NFD);
    return normalized.replaceAll("\\p{M}", "");
  }
}
