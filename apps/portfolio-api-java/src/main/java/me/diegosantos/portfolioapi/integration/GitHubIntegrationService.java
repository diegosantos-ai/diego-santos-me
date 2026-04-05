package me.diegosantos.portfolioapi.integration;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class GitHubIntegrationService {

  private static final Logger log = LoggerFactory.getLogger(GitHubIntegrationService.class);
  private static final String GITHUB_API_BASE = "https://api.github.com";

  private final HttpClient httpClient;
  private final ObjectMapper objectMapper;

  @Value("${github.token:}")
  private String githubToken;

  public GitHubIntegrationService(ObjectMapper objectMapper) {
    this.httpClient = HttpClient.newHttpClient();
    this.objectMapper = objectMapper;
  }

  public List<PullRequestData> fetchMergedPullRequests(String repository) {
    List<PullRequestData> results = new ArrayList<>();
    String url =
        GITHUB_API_BASE
            + "/repos/"
            + repository
            + "/pulls?state=closed&sort=updated&direction=desc&per_page=20";

    try {
      HttpRequest.Builder requestBuilder =
          HttpRequest.newBuilder()
              .uri(URI.create(url))
              .header("Accept", "application/vnd.github+json")
              .header("X-GitHub-Api-Version", "2022-11-28")
              .GET();

      if (githubToken != null && !githubToken.isBlank()) {
        requestBuilder.header("Authorization", "Bearer " + githubToken);
      }

      HttpResponse<String> response =
          httpClient.send(requestBuilder.build(), HttpResponse.BodyHandlers.ofString());

      if (response.statusCode() != 200) {
        log.error(
            "Falha ao buscar PRs do GitHub. Repositório: {}, Status: {}",
            repository,
            response.statusCode());
        return results;
      }

      JsonNode prs = objectMapper.readTree(response.body());
      for (JsonNode pr : prs) {
        if (pr.path("merged_at").isNull()) continue;

        PullRequestData data =
            new PullRequestData(
                "github-pr-" + pr.path("id").asLong(),
                repository,
                "https://github.com/" + repository,
                pr.path("number").asInt(),
                pr.path("html_url").asText(),
                pr.path("title").asText(),
                pr.path("body").asText(""),
                pr.path("merged_at").asText());
        results.add(data);
      }

    } catch (Exception e) {
      log.error("Erro ao buscar PRs do GitHub para {}: {}", repository, e.getMessage());
    }

    return results;
  }

  public record PullRequestData(
      String externalId,
      String repositoryName,
      String repositoryUrl,
      int pullRequestNumber,
      String pullRequestUrl,
      String title,
      String body,
      String mergedAt) {}
}
