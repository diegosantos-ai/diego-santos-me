package me.diegosantos.portfolioapi.domain.learning;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.List;
import me.diegosantos.portfolioapi.integration.GitHubIntegrationService;
import me.diegosantos.portfolioapi.integration.GitHubIntegrationService.PullRequestData;
import me.diegosantos.portfolioapi.integration.LlmSummaryService;
import me.diegosantos.portfolioapi.integration.LlmSummaryService.LearningEnrichment;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

@ExtendWith(MockitoExtension.class)
class LearningEventServiceTest {

  @Mock private LearningEventRepository eventRepository;
  @Mock private LearningSyncRunRepository syncRunRepository;
  @Mock private GitHubIntegrationService gitHubService;
  @Mock private LlmSummaryService llmService;

  @InjectMocks private LearningEventService service;

  @BeforeEach
  void setUp() {
    ReflectionTestUtils.setField(service, "learningRepositories", "owner/repo");
    ReflectionTestUtils.setField(service, "autoPublish", true);
    when(syncRunRepository.save(any(LearningSyncRun.class)))
        .thenAnswer(invocation -> invocation.getArgument(0));
  }

  @Test
  void executeSyncRunCreatesPublishedLearningEvent() {
    PullRequestData pullRequest =
        new PullRequestData(
            "github-pr-1",
            "owner/repo",
            "https://github.com/owner/repo",
            42,
            "https://github.com/owner/repo/pull/42",
            "Add healthcheck endpoint",
            "Implements app health route and compose checks.",
            "2026-04-05T15:21:37Z");

    when(gitHubService.fetchMergedPullRequests("owner/repo")).thenReturn(List.of(pullRequest));
    when(eventRepository.existsByExternalId("github-pr-1")).thenReturn(false);
    when(llmService.enrich(pullRequest.title(), pullRequest.body()))
        .thenReturn(new LearningEnrichment("Health endpoint and checks.", "backend", false));

    LearningSyncRun run = service.executeSyncRun("manual");

    ArgumentCaptor<LearningEvent> eventCaptor = ArgumentCaptor.forClass(LearningEvent.class);
    verify(eventRepository).save(eventCaptor.capture());

    LearningEvent savedEvent = eventCaptor.getValue();
    assertThat(savedEvent.getExternalId()).isEqualTo("github-pr-1");
    assertThat(savedEvent.getRepositoryName()).isEqualTo("owner/repo");
    assertThat(savedEvent.getPullRequestNumber()).isEqualTo(42);
    assertThat(savedEvent.getTitle()).isEqualTo("Add healthcheck endpoint");
    assertThat(savedEvent.getSummary()).isEqualTo("Health endpoint and checks.");
    assertThat(savedEvent.getTechnicalCategory()).isEqualTo("backend");
    assertThat(savedEvent.getStatus()).isEqualTo(LearningEventStatus.PUBLISHED);
    assertThat(savedEvent.getEventDate()).isEqualTo(LocalDateTime.of(2026, 4, 5, 15, 21, 37));
    assertThat(savedEvent.getPublishedAt()).isEqualTo(LocalDateTime.of(2026, 4, 5, 15, 21, 37));
    assertThat(savedEvent.getProcessedAt()).isNotNull();

    assertThat(run.getTriggerType()).isEqualTo("manual");
    assertThat(run.getStatus()).isEqualTo("success");
    assertThat(run.getRepositoriesChecked()).isEqualTo(1);
    assertThat(run.getPullRequestsFound()).isEqualTo(1);
    assertThat(run.getItemsCreated()).isEqualTo(1);
    assertThat(run.getItemsFailed()).isEqualTo(0);
  }

  @Test
  void executeSyncRunSkipsMalformedPullRequestWithoutPersistingEvent() {
    PullRequestData malformedPullRequest =
        new PullRequestData(
            null,
            "owner/repo",
            "https://github.com/owner/repo",
            99,
            "https://github.com/owner/repo/pull/99",
            "Broken payload",
            "Body",
            "2026-04-05T15:21:37Z");

    when(gitHubService.fetchMergedPullRequests("owner/repo"))
        .thenReturn(List.of(malformedPullRequest));

    LearningSyncRun run = service.executeSyncRun("manual");

    verify(eventRepository, never()).save(any(LearningEvent.class));
    verify(llmService, never()).enrich(any(), any());
    assertThat(run.getStatus()).isEqualTo("partial_success");
    assertThat(run.getItemsCreated()).isEqualTo(0);
    assertThat(run.getItemsFailed()).isEqualTo(1);
  }

  @Test
  void executeSyncRunKeepsLowContextPullRequestAsPending() {
    PullRequestData pullRequest =
        new PullRequestData(
            "github-pr-2",
            "owner/repo",
            "https://github.com/owner/repo",
            43,
            "https://github.com/owner/repo/pull/43",
            "Develop",
            "",
            "2026-04-05T16:00:00Z");

    when(gitHubService.fetchMergedPullRequests("owner/repo")).thenReturn(List.of(pullRequest));
    when(eventRepository.existsByExternalId("github-pr-2")).thenReturn(false);
    when(llmService.enrich(pullRequest.title(), pullRequest.body()))
        .thenReturn(
            new LearningEnrichment(
                "Registro criado a partir de um merge com pouco contexto no Pull Request.",
                "engineering",
                true));

    LearningSyncRun run = service.executeSyncRun("manual");

    ArgumentCaptor<LearningEvent> eventCaptor = ArgumentCaptor.forClass(LearningEvent.class);
    verify(eventRepository).save(eventCaptor.capture());

    LearningEvent savedEvent = eventCaptor.getValue();
    assertThat(savedEvent.getStatus()).isEqualTo(LearningEventStatus.PENDING);
    assertThat(savedEvent.getIsAutoPublished()).isFalse();
    assertThat(savedEvent.getPublishedAt()).isNull();

    assertThat(run.getStatus()).isEqualTo("success");
    assertThat(run.getItemsCreated()).isEqualTo(1);
    assertThat(run.getItemsFailed()).isEqualTo(0);
  }
}
