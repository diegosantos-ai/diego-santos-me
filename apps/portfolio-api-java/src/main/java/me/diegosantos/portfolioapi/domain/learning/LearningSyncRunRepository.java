package me.diegosantos.portfolioapi.domain.learning;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LearningSyncRunRepository extends JpaRepository<LearningSyncRun, Long> {}
