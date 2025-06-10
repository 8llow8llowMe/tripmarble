package com.followfollowme.tripmarble.global.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class CommandLineJobDispatcherConfig {

    private final JobLauncher jobLauncher;
    private final Map<String, Job> jobs;

    @Bean
    public CommandLineRunner commandLineRunner() {
        return args -> {
            String jobName = null;
            String regionCode = null;
            String listYn = null;

            for (String arg : args) {
                if (arg.startsWith("--jobName=")) {
                    jobName = arg.substring("--jobName=".length());
                } else if (arg.startsWith("--regionCode=")) {
                    regionCode = arg.substring("--regionCode=".length());
                } else if (arg.startsWith("--listYn=")) {
                    listYn = arg.substring("--listYn=".length());
                }
            }

            if (jobName == null) {
                log.warn("[CLI] --jobName 인자가 없기 때문에, 배치 작업을 실행 하지 않습니다.");
                return;
            }

            Job job = jobs.get(jobName);
            if (job == null) {
                log.error("[CLI] 등록되지 않은 job: {}", jobName);
                return;
            }

            JobParametersBuilder builder = new JobParametersBuilder()
                .addLong("timestamp", System.currentTimeMillis()); // 실행 구분용

            if (regionCode != null) {
                builder.addString("regionCode", regionCode);
            }

            if (listYn != null) builder.addString("listYn", listYn);

            log.info("[CLI] Job 실행: {}, regionCode={}", jobName, regionCode);
            jobLauncher.run(job, builder.toJobParameters());
        };
    }
}
