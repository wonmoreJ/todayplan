FROM eclipse-temurin:11-jdk
COPY target/today-plan-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]