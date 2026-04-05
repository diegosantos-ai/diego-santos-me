package me.diegosantos.portfolioapi.domain.learning;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.Arrays;
import java.util.List;
import me.diegosantos.portfolioapi.integration.GitHubIntegrationService;
import me.diegosantos.portfolioapi.integration.GitHubIntegrationService.PullRequestData;
import me.diegosantos.portfolioapi.integration.LlmSummaryService;
import me.diegosantos.portfolioapi.integration.LlmSummaryService.LearningEnrichment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LearningEventService {

  private static final Logger log = LoggerFactory.getLogger(LearningEventService.class);

  private final LearningEventRepository eventRepository;
  private final LearningSyncRunRepository syncRunRepository;
  private final GitHubIntegrationService gitHubService;
  private final LlmSummaryService llmService;

  @Value("${learning.repositories:}")
  private String learningRepositories;

  @Value("${learning.auto-publish:false}")
  private boolean autoPublish;

  public LearningEventService(
      LearningEventRepository eventRepository,
      LearningSyncRunRepository syncRunRepository,
      GitHubIntegrationService gitHubService,
      LlmSummaryService llmService) {
    this.eventRepository = eventRepository;
    this.syncRunRepository = syncRunRepository;
    this.gitHubService = gitHubService;
    this.llmService = llmService;
  }

  @Transactional
  public LearningSyncRun executeSyncRun() {
    return executeSyncRun("scheduled");
  }

  @Transactional
  public LearningSyncRun executeSyncRun(String triggerType) {
    LearningSyncRun run = new LearningSyncRun();
    run.setStartedAt(LocalDateTime.now());
    run.setStatus("running");
    run.setTriggerType(triggerType);
    run = syncRunRepository.save(run);

    int created = 0;
    int failed = 0;
    int reposChecked = 0;
    int prsFound = 0;

    List<String> repos =
        Arrays.stream(learningRepositories.split(","))
            .map(String::trim)
            .filter(r -> !r.isBlank())
            .toList();

    if (repos.isEmpty()) {
      run.setFinishedAt(LocalDateTime.now());
      run.setStatus("success");
      run.setLogSummary("Nenhum repositório configurado em learning.repositories.");
      return syncRunRepository.save(run);
    }

    for (String repo : repos) {
      reposChecked++;
      try {
        List<PullRequestData> prs = gitHubService.fetchMergedPullRequests(repo);
        prsFound += prs.size();

        for (PullRequestData pr : prs) {
          if (!hasRequiredFields(pr)) {
            log.warn("PR ignorado por dados obrigatórios ausentes no repositório {}.", repo);
            failed++;
            continue;
          }

          if (eventRepository.existsByExternalId(pr.externalId())) {
            continue;
          }

          try {
            LearningEnrichment enrichment = llmService.enrich(pr.title(), pr.body());
            LocalDateTime processedAt = LocalDateTime.now();
            LocalDateTime eventDate = parseMergedAt(pr.mergedAt());
            boolean shouldAutoPublish = autoPublish && !enrichment.needsReview();

            LearningEvent event = new LearningEvent();
            event.setExternalId(pr.externalId());
            event.setRepositoryName(pr.repositoryName());
            event.setRepositoryUrl(pr.repositoryUrl());
            event.setPullRequestNumber(pr.pullRequestNumber());
            event.setPullRequestUrl(pr.pullRequestUrl());
            event.setTitle(pr.title());
            event.setSummary(enrichment.summary());
            event.setTechnicalCategory(enrichment.technicalCategory());
            event.setEventDate(eventDate != null ? eventDate : processedAt);
            event.setRawSourceReference(pr.body());
            event.setProcessedAt(processedAt);

            LearningEventStatus status =
                shouldAutoPublish ? LearningEventStatus.PUBLISHED : LearningEventStatus.PENDING;
            event.setStatus(status);
            event.setIsAutoPublished(shouldAutoPublish);

            if (shouldAutoPublish) {
              event.setPublishedAt(eventDate != null ? eventDate : processedAt);
            } else if (enrichment.needsReview()) {
              log.info(
                  "LearningEvent criado como PENDING por falta de contexto suficiente: {}",
                  pr.title());
            }

            eventRepository.save(event);
            created++;
            log.info("LearningEvent criado: {}", pr.title());

          } catch (Exception e) {
            log.error("Falha ao processar PR {}: {}", pr.pullRequestUrl(), e.getMessage());
            failed++;
          }
        }
      } catch (Exception e) {
        log.error("Falha ao processar repositório {}: {}", repo, e.getMessage());
        failed++;
      }
    }

    run.setFinishedAt(LocalDateTime.now());
    run.setStatus(failed == 0 ? "success" : "partial_success");
    run.setRepositoriesChecked(reposChecked);
    run.setPullRequestsFound(prsFound);
    run.setItemsCreated(created);
    run.setItemsFailed(failed);
    run.setLogSummary(
        "Repos verificados: "
            + reposChecked
            + ", PRs encontrados: "
            + prsFound
            + ", criados: "
            + created
            + ", falhas: "
            + failed);
    return syncRunRepository.save(run);
  }

  private LocalDateTime parseMergedAt(String mergedAt) {
    if (mergedAt == null || mergedAt.isBlank()) {
      return null;
    }

    try {
      return OffsetDateTime.parse(mergedAt).toLocalDateTime();
    } catch (Exception e) {
      log.warn("Falha ao converter merged_at '{}'. Usando processedAt como fallback.", mergedAt);
      return null;
    }
  }

  private boolean hasRequiredFields(PullRequestData pr) {
    return pr != null
        && hasText(pr.externalId())
        && hasText(pr.repositoryName())
        && hasText(pr.title())
        && hasText(pr.pullRequestUrl());
  }

  private boolean hasText(String value) {
    return value != null && !value.isBlank();
  }
}
