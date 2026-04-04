package me.diegosantos.portfolioapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PortfolioApiJavaApplication {

  public static void main(String[] args) {
    SpringApplication.run(PortfolioApiJavaApplication.class, args);
  }
}
