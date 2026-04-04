package me.diegosantos.portfolioapi;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

/**
 * Smoke test de sanidade da aplicação.
 *
 * <p>TODO: Adicionar testes de integração reais com Testcontainers (Fase futura). O contextLoads()
 * completo (com DataSource e Flyway) exige um Postgres real — não adequado para teste unitário.
 */
class PortfolioApiJavaApplicationTests {

  @Test
  void contextLoads() {
    assertThat(PortfolioApiJavaApplication.class).isNotNull();
  }
}
