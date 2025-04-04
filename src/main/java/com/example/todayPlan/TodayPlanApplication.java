package com.example.todayPlan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class TodayPlanApplication {

	public static void main(String[] args) {
		/*
		 * // .env 로드 Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
		 * 
		 * // Spring 환경변수로 등록 System.setProperty("DB_URL", dotenv.get("DB_URL"));
		 * System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
		 * System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
		 */
		SpringApplication.run(TodayPlanApplication.class, args);
	}

}
