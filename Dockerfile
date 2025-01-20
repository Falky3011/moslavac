FROM openjdk:23-jdk AS backend
WORKDIR /app
COPY pom.xml .
COPY src src
COPY mvnw .
COPY .mvn .mvn
RUN chmod +x ./mvnw
RUN ./mvnw clean package -DskipTests


FROM openjdk:23-jdk
WORKDIR /app

COPY --from=backend /app/target/*.jar app.jar


ENTRYPOINT ["java", "-jar", "/app/app.jar"]
EXPOSE 8080