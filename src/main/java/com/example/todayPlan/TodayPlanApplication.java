package com.example.todayPlan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class TodayPlanApplication {

	public static void main(String[] args) {
		String envMode = System.getenv("ENV_MODE"); // 기본적으로 OS 환경변수 우선

		// 만약 ENV_MODE가 null이거나 local이면 dotenv 로드
		if (envMode == null || "local".equalsIgnoreCase(envMode)) {
			try {
				Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
				envMode = dotenv.get("ENV_MODE");

				if ("local".equalsIgnoreCase(envMode)) {
					// OS 환경변수가 없으면 설정
					if (System.getenv("DB_URL") == null) System.setProperty("DB_URL", dotenv.get("DB_URL"));
					if (System.getenv("DB_USERNAME") == null) System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
					if (System.getenv("DB_PASSWORD") == null) System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));

					System.out.println("✅ 로컬 환경: .env에서 환경변수 로드 완료!");
				}
			} catch (Exception e) {
				System.out.println("⚠️ .env 로드 실패 (무시): " + e.getMessage());
			}
		} else {
			System.out.println("🚀 배포 환경: OS 환경변수 사용 중!");
		}

		SpringApplication.run(TodayPlanApplication.class, args);
	}

}
