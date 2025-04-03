FROM eclipse-temurin:11-jdk AS build

WORKDIR /app
COPY . .

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests


FROM eclipse-temurin:11-jdk

WORKDIR /app

COPY --from=build /app/target/today-plan-0.0.1-SNAPSHOT.war app.war


ENTRYPOINT ["java", "-jar", "app.war"]