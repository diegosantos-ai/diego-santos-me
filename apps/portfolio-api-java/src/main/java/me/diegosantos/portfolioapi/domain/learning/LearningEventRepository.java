package me.diegosantos.portfolioapi.domain.learning;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LearningEventRepository extends JpaRepository<LearningEvent, Long> {

  Page<LearningEvent> findByStatusOrderByEventDateDesc(
      LearningEventStatus status, Pageable pageable);

  Optional<LearningEvent> findByExternalId(String externalId);

  boolean existsByExternalId(String externalId);

  List<LearningEvent> findByStatusInOrderByCreatedAtDesc(List<LearningEventStatus> statuses);
}
