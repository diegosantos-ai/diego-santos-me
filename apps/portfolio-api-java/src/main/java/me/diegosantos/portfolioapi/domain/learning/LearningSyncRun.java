package me.diegosantos.portfolioapi.domain.learning;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "learning_sync_runs")
public class LearningSyncRun {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "started_at", nullable = false)
  private LocalDateTime startedAt;

  @Column(name = "finished_at")
  private LocalDateTime finishedAt;

  @Column(nullable = false)
  private String status;

  @Column(name = "repositories_checked")
  private Integer repositoriesChecked = 0;

  @Column(name = "pull_requests_found")
  private Integer pullRequestsFound = 0;

  @Column(name = "items_created")
  private Integer itemsCreated = 0;

  @Column(name = "items_updated")
  private Integer itemsUpdated = 0;

  @Column(name = "items_failed")
  private Integer itemsFailed = 0;

  @Column(name = "trigger_type")
  private String triggerType;

  @Column(name = "log_summary", columnDefinition = "TEXT")
  private String logSummary;

  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @PrePersist
  protected void onCreate() {
    createdAt = LocalDateTime.now();
  }

  // Getters e Setters

  public Long getId() {
    return id;
  }

  public LocalDateTime getStartedAt() {
    return startedAt;
  }

  public void setStartedAt(LocalDateTime startedAt) {
    this.startedAt = startedAt;
  }

  public LocalDateTime getFinishedAt() {
    return finishedAt;
  }

  public void setFinishedAt(LocalDateTime finishedAt) {
    this.finishedAt = finishedAt;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public Integer getRepositoriesChecked() {
    return repositoriesChecked;
  }

  public void setRepositoriesChecked(Integer repositoriesChecked) {
    this.repositoriesChecked = repositoriesChecked;
  }

  public Integer getPullRequestsFound() {
    return pullRequestsFound;
  }

  public void setPullRequestsFound(Integer pullRequestsFound) {
    this.pullRequestsFound = pullRequestsFound;
  }

  public Integer getItemsCreated() {
    return itemsCreated;
  }

  public void setItemsCreated(Integer itemsCreated) {
    this.itemsCreated = itemsCreated;
  }

  public Integer getItemsUpdated() {
    return itemsUpdated;
  }

  public void setItemsUpdated(Integer itemsUpdated) {
    this.itemsUpdated = itemsUpdated;
  }

  public Integer getItemsFailed() {
    return itemsFailed;
  }

  public void setItemsFailed(Integer itemsFailed) {
    this.itemsFailed = itemsFailed;
  }

  public String getTriggerType() {
    return triggerType;
  }

  public void setTriggerType(String triggerType) {
    this.triggerType = triggerType;
  }

  public String getLogSummary() {
    return logSummary;
  }

  public void setLogSummary(String logSummary) {
    this.logSummary = logSummary;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }
}
