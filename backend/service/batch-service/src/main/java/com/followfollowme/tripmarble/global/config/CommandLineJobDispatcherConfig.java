package com.followfollowme.tripmarble.global.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class CommandLineJobDispatcherConfig {

    // Job별 필수 파라미터 정의
    private static final Map<String, List<String>> REQUIRED_PARAMS = Map.of(
        "regionJob", List.of("regionCode", "listYn")
    );

    // Job별 선택 파라미터 정의
    private static final Map<String, List<String>> OPTIONAL_PARAMS = Map.of(
        "tripSpotJob", List.of("contentTypeId", "arrange")
    );

    private final JobLauncher jobLauncher;
    private final Map<String, Job> jobs;

    @Bean
    public CommandLineRunner commandLineRunner() {
        return args -> {
            Map<String, String> paramMap = Arrays.stream(args)
                .filter(arg -> arg.startsWith("--") && arg.contains("="))
                .map(arg -> arg.substring(2).split("=", 2))
                .collect(Collectors.toMap(a -> a[0], a -> a[1]));

            String jobName = paramMap.get("jobName");
            if (jobName == null) {
                log.warn("[CLI] --jobName 인자가 없기 때문에, 배치 작업을 실행하지 않습니다.");
                return;
            }

            Job job = jobs.get(jobName);
            if (job == null) {
                log.error("[CLI] 등록되지 않은 job: {}", jobName);
                log.info("[CLI] 사용 가능한 Job 이름 목록: {}", String.join(", ", jobs.keySet()));
                return;
            }

            // 필수 파라미터 검증
            List<String> requiredKeys = REQUIRED_PARAMS.getOrDefault(jobName, List.of());
            List<String> missingParams = requiredKeys.stream()
                .filter(key -> !paramMap.containsKey(key))
                .toList();

            if (!missingParams.isEmpty()) {
                log.error("[CLI] Job '{}' 실행에 필요한 필수 파라미터가 누락됨: {}", jobName, missingParams);
                return;
            }

            JobParametersBuilder builder = new JobParametersBuilder()
                .addLong("timestamp", System.currentTimeMillis());

            paramMap.forEach((key, value) -> {
                if (!"jobName".equals(key)) {
                    builder.addString(key, value);
                }
            });

            log.info("[CLI] Job 실행: {}, 전달된 파라미터: {}", jobName, paramMap);
            jobLauncher.run(job, builder.toJobParameters());
        };
    }
}
