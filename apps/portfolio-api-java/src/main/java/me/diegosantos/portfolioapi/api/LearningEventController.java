package me.diegosantos.portfolioapi.api;

import me.diegosantos.portfolioapi.domain.learning.LearningEvent;
import me.diegosantos.portfolioapi.domain.learning.LearningEventRepository;
import me.diegosantos.portfolioapi.domain.learning.LearningEventStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/learning-events")
public class LearningEventController {

  private final LearningEventRepository repository;

  public LearningEventController(LearningEventRepository repository) {
    this.repository = repository;
  }

  @GetMapping
  public Page<LearningEvent> list(
      @RequestParam(defaultValue = "PUBLISHED") String status,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {

    LearningEventStatus eventStatus;
    try {
      eventStatus = LearningEventStatus.valueOf(status.toUpperCase());
    } catch (IllegalArgumentException e) {
      eventStatus = LearningEventStatus.PUBLISHED;
    }

    Pageable pageable = PageRequest.of(page, size);
    return repository.findByStatusOrderByEventDateDesc(eventStatus, pageable);
  }

  @GetMapping("/{id}")
  public ResponseEntity<LearningEvent> getById(@PathVariable Long id) {
    return repository
        .findById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }
}
