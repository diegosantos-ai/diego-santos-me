package me.diegosantos.portfolioapi.domain.learning;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "learning_events")
public class LearningEvent {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "external_id", unique = true, nullable = false)
  private String externalId;

  @Column(name = "repository_name", nullable = false)
  private String repositoryName;

  @Column(name = "repository_url")
  private String repositoryUrl;

  @Column(name = "pull_request_number")
  private Integer pullRequestNumber;

  @Column(name = "pull_request_url")
  private String pullRequestUrl;

  @Column(nullable = false)
  private String title;

  @Column(columnDefinition = "TEXT")
  private String summary;

  @Column(name = "technical_category")
  private String technicalCategory;

  @Column(name = "event_date")
  private LocalDateTime eventDate;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private LearningEventStatus status;

  @Column(name = "is_auto_published")
  private Boolean isAutoPublished = false;

  @Column(name = "raw_source_reference", columnDefinition = "TEXT")
  private String rawSourceReference;

  @Column(name = "processed_at")
  private LocalDateTime processedAt;

  @Column(name = "published_at")
  private LocalDateTime publishedAt;

  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;

  @PrePersist
  protected void onCreate() {
    createdAt = LocalDateTime.now();
    updatedAt = LocalDateTime.now();
  }

  @PreUpdate
  protected void onUpdate() {
    updatedAt = LocalDateTime.now();
  }

  // Getters e Setters

  public Long getId() {
    return id;
  }

  public String getExternalId() {
    return externalId;
  }

  public void setExternalId(String externalId) {
    this.externalId = externalId;
  }

  public String getRepositoryName() {
    return repositoryName;
  }

  public void setRepositoryName(String repositoryName) {
    this.repositoryName = repositoryName;
  }

  public String getRepositoryUrl() {
    return repositoryUrl;
  }

  public void setRepositoryUrl(String repositoryUrl) {
    this.repositoryUrl = repositoryUrl;
  }

  public Integer getPullRequestNumber() {
    return pullRequestNumber;
  }

  public void setPullRequestNumber(Integer pullRequestNumber) {
    this.pullRequestNumber = pullRequestNumber;
  }

  public String getPullRequestUrl() {
    return pullRequestUrl;
  }

  public void setPullRequestUrl(String pullRequestUrl) {
    this.pullRequestUrl = pullRequestUrl;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getSummary() {
    return summary;
  }

  public void setSummary(String summary) {
    this.summary = summary;
  }

  public String getTechnicalCategory() {
    return technicalCategory;
  }

  public void setTechnicalCategory(String technicalCategory) {
    this.technicalCategory = technicalCategory;
  }

  public LocalDateTime getEventDate() {
    return eventDate;
  }

  public void setEventDate(LocalDateTime eventDate) {
    this.eventDate = eventDate;
  }

  public LearningEventStatus getStatus() {
    return status;
  }

  public void setStatus(LearningEventStatus status) {
    this.status = status;
  }

  public Boolean getIsAutoPublished() {
    return isAutoPublished;
  }

  public void setIsAutoPublished(Boolean isAutoPublished) {
    this.isAutoPublished = isAutoPublished;
  }

  public String getRawSourceReference() {
    return rawSourceReference;
  }

  public void setRawSourceReference(String rawSourceReference) {
    this.rawSourceReference = rawSourceReference;
  }

  public LocalDateTime getProcessedAt() {
    return processedAt;
  }

  public void setProcessedAt(LocalDateTime processedAt) {
    this.processedAt = processedAt;
  }

  public LocalDateTime getPublishedAt() {
    return publishedAt;
  }

  public void setPublishedAt(LocalDateTime publishedAt) {
    this.publishedAt = publishedAt;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }
}
