package me.diegosantos.portfolioapi.domain.learning;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class LearningInPublicScheduler {

  private static final Logger log = LoggerFactory.getLogger(LearningInPublicScheduler.class);

  private final LearningEventService learningEventService;

  @Value("${learning.enabled:true}")
  private boolean learningEnabled;

  public LearningInPublicScheduler(LearningEventService learningEventService) {
    this.learningEventService = learningEventService;
  }

  @Scheduled(cron = "${learning.cron-schedule:0 0 */6 * * *}")
  public void runSync() {
    if (!learningEnabled) {
      log.info("Learning in Public desativado. Sync ignorado.");
      return;
    }

    log.info("Iniciando sync do Learning in Public...");
    try {
      LearningSyncRun result = learningEventService.executeSyncRun();
      log.info(
          "Sync concluído. Status: {}, Criados: {}, Falhas: {}",
          result.getStatus(),
          result.getItemsCreated(),
          result.getItemsFailed());
    } catch (Exception e) {
      log.error("Erro crítico no sync do Learning in Public: {}", e.getMessage());
    }
  }
}
