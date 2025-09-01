package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.batch.job;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.batch.tasklet.TripSpotTasklet;
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
public class TripSpotBatchJob {

    private final JobRepository jobRepository;
    private final PlatformTransactionManager transactionManager;
    private final TripSpotTasklet tripSpotTasklet;

    @Bean
    public Job tripSpotJob() {
        return new JobBuilder("tripSpotJob", jobRepository)
            .start(tripSpotStep())
            .build();
    }

    @Bean
    public Step tripSpotStep() {
        return new StepBuilder("tripSpotStep", jobRepository)
            .tasklet(tripSpotTasklet, transactionManager)
            .build();
    }
}
