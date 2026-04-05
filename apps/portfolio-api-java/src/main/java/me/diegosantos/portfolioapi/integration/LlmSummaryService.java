package me.diegosantos.portfolioapi.integration;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.LinkedHashMap;
import java.util.Locale;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class LlmSummaryService {

  public record LearningEnrichment(String summary, String technicalCategory) {}

  private static final Logger log = LoggerFactory.getLogger(LlmSummaryService.class);
  private static final String OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
  private static final String MODEL = "google/gemini-2.0-flash-001";

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

    if (llmApiKey == null || llmApiKey.isBlank()) {
      log.warn("LLM_API_KEY não configurada. Retornando título e categoria inferida localmente.");
      return new LearningEnrichment(title, fallbackCategory);
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
        return new LearningEnrichment(title, fallbackCategory);
      }

      JsonNode root = objectMapper.readTree(response.body());
      String content = root.path("choices").path(0).path("message").path("content").asText("");
      return parseEnrichmentContent(content, title, fallbackCategory);

    } catch (Exception e) {
      log.error("Falha ao chamar LLM: {}", e.getMessage());
      return new LearningEnrichment(title, fallbackCategory);
    }
  }

  private LearningEnrichment parseEnrichmentContent(
      String content, String fallbackSummary, String fallbackCategory) {
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

      return new LearningEnrichment(summary, technicalCategory);
    } catch (Exception e) {
      log.warn("Resposta do LLM fora do formato JSON esperado. Aplicando fallback local.");
      return new LearningEnrichment(
          cleanedContent.isBlank() ? fallbackSummary : cleanedContent, fallbackCategory);
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
}
