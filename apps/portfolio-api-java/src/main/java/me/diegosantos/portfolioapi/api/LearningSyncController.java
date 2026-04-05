package me.diegosantos.portfolioapi.api;

import me.diegosantos.portfolioapi.domain.learning.LearningEventService;
import me.diegosantos.portfolioapi.domain.learning.LearningSyncRun;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/learning-events")
public class LearningSyncController {

  public record LearningSyncRunResponse(
      Long id,
      String status,
      Integer repositoriesChecked,
      Integer pullRequestsFound,
      Integer itemsCreated,
      Integer itemsFailed,
      String triggerType,
      String logSummary) {}

  private final LearningEventService learningEventService;

  @Value("${learning.admin-token:}")
  private String adminToken;

  public LearningSyncController(LearningEventService learningEventService) {
    this.learningEventService = learningEventService;
  }

  @PostMapping("/sync")
  public ResponseEntity<?> triggerSync(
      @RequestHeader(value = "X-Learning-Admin-Token", required = false) String providedToken) {
    if (adminToken == null || adminToken.isBlank()) {
      return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
          .body("Manual sync desabilitado: LEARNING_ADMIN_TOKEN nao configurado.");
    }

    if (!adminToken.equals(providedToken)) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Token invalido.");
    }

    LearningSyncRun run = learningEventService.executeSyncRun("manual");

    return ResponseEntity.ok(
        new LearningSyncRunResponse(
            run.getId(),
            run.getStatus(),
            run.getRepositoriesChecked(),
            run.getPullRequestsFound(),
            run.getItemsCreated(),
            run.getItemsFailed(),
            run.getTriggerType(),
            run.getLogSummary()));
  }
}
