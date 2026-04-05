# ==============================================================================
# STAGE 1: Build do Artefato JAR
# ==============================================================================
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app

# Cache das dependências do Gradle separado do código-fonte
COPY gradlew ./
COPY gradle ./gradle
RUN chmod +x gradlew && ./gradlew dependencies --no-daemon 2>/dev/null || true

COPY . .
RUN ./gradlew build -x test --no-daemon

# ==============================================================================
# STAGE 2: Runtime Mínimo (JRE apenas)
# ==============================================================================
FROM eclipse-temurin:21-jre-alpine AS runner

RUN apk add --no-cache wget && \
    addgroup --system --gid 1001 appgroup && \
    adduser --system --uid 1001 --ingroup appgroup appuser

WORKDIR /app

COPY --from=builder --chown=appuser:appgroup \
    /app/build/libs/*.jar ./app.jar

USER appuser

EXPOSE 8080

ENV JAVA_OPTS="-Xms256m -Xmx256m"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
