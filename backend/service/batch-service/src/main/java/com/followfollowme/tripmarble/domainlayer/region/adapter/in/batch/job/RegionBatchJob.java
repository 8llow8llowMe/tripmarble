package com.followfollowme.tripmarble.domainlayer.region.adapter.in.batch.job;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.batch.tasklet.RegionTasklet;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@RequiredArgsConstructor
public class RegionBatchJob {

    private final JobRepository jobRepository;
    private final PlatformTransactionManager transactionManager;
    private final RegionTasklet regionTasklet;

    @Bean
    public Job regionJob() {
        return new JobBuilder("regionJob", jobRepository)
            .start(regionStep())
            .build();
    }

    @Bean
    public Step regionStep() {
        return new StepBuilder("regionStep", jobRepository)
            .tasklet(regionTasklet, transactionManager)
            .build();
    }
}
