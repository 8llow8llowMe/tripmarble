# 빌드 환경 설정 단계
FROM ibm-semeru-runtimes:open-21-jre-jammy

ARG JAR_FILE=./trip-service.jar

# 빌드된 JAR 파일 복사 (빌드 아티팩트를 CI/CD 빌드 단계에서 제공)
COPY ${JAR_FILE} /app/trip-service.jar

ENTRYPOINT ["sh", "-c", "java -Duser.timezone=$TIME_ZONE -Dspring.profiles.active=$SPRING_PROFILES_ACTIVE -jar /app/trip-service.jar"]