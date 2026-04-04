package me.diegosantos.portfolioapi.integration;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class LlmSummaryService {

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

  public String summarize(String title, String body) {
    if (llmApiKey == null || llmApiKey.isBlank()) {
      log.warn("LLM_API_KEY não configurada. Retornando título como summary.");
      return title;
    }

    String prompt =
        """
                Você é um assistente técnico de um portfólio de engenharia de software.
                Analise o seguinte Pull Request e gere um resumo técnico conciso em português.
                O resumo deve explicar o que foi feito, qual problema resolve e qual tecnologia foi utilizada.
                Escreva em no máximo 3 frases curtas e diretas. Sem bullet points.

                Título: %s

                Descrição: %s
                """
            .formatted(title, body.isBlank() ? "Sem descrição." : body);

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
        return title;
      }

      JsonNode root = objectMapper.readTree(response.body());
      return root.path("choices").path(0).path("message").path("content").asText(title);

    } catch (Exception e) {
      log.error("Falha ao chamar LLM: {}", e.getMessage());
      return title;
    }
  }
}
