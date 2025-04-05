package com.example.todayPlan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class TodayPlanApplication {

	public static void main(String[] args) {
		// 환경 변수 중 ENV_MODE가 local이면 .env 로드
		
		Dotenv dotenv = Dotenv.load();
		String envMode = dotenv.get("ENV_MODE");
		
		if ("local".equalsIgnoreCase(envMode)) {
			System.setProperty("DB_URL", dotenv.get("DB_URL"));
			System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
			System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
			System.out.println("✅ 로컬 환경: .env에서 환경변수 로드 완료!");
		} else {
			System.out.println("🚀 배포 환경: OS 환경변수 사용 중!");
		}

		SpringApplication.run(TodayPlanApplication.class, args);
	}

}
