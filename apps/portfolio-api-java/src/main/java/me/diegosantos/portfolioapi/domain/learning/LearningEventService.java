package me.diegosantos.portfolioapi.domain.learning;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import me.diegosantos.portfolioapi.integration.GitHubIntegrationService;
import me.diegosantos.portfolioapi.integration.GitHubIntegrationService.PullRequestData;
import me.diegosantos.portfolioapi.integration.LlmSummaryService;
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
    LearningSyncRun run = new LearningSyncRun();
    run.setStartedAt(LocalDateTime.now());
    run.setStatus("running");
    run.setTriggerType("scheduled");
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

    for (String repo : repos) {
      reposChecked++;
      try {
        List<PullRequestData> prs = gitHubService.fetchMergedPullRequests(repo);
        prsFound += prs.size();

        for (PullRequestData pr : prs) {
          if (eventRepository.existsByExternalId(pr.externalId())) {
            continue;
          }
          try {
            String summary = llmService.summarize(pr.title(), pr.body());

            LearningEvent event = new LearningEvent();
            event.setExternalId(pr.externalId());
            event.setRepositoryName(pr.repositoryName());
            event.setRepositoryUrl(pr.repositoryUrl());
            event.setPullRequestNumber(pr.pullRequestNumber());
            event.setPullRequestUrl(pr.pullRequestUrl());
            event.setTitle(pr.title());
            event.setSummary(summary);
            event.setRawSourceReference(pr.body());
            event.setProcessedAt(LocalDateTime.now());

            LearningEventStatus status =
                autoPublish ? LearningEventStatus.PUBLISHED : LearningEventStatus.PENDING;
            event.setStatus(status);
            event.setIsAutoPublished(autoPublish);

            if (autoPublish) {
              event.setPublishedAt(LocalDateTime.now());
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
    return syncRunRepository.save(run);
  }
}
