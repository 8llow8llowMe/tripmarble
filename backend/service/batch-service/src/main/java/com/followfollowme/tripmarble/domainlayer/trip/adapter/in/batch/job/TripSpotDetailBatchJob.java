package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.batch.job;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.batch.tasklet.TripSpotDetailTasklet;
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
public class TripSpotDetailBatchJob {

    private final JobRepository jobRepository;
    private final PlatformTransactionManager transactionManager;
    private final TripSpotDetailTasklet tripSpotDetailTasklet;

    @Bean
    public Job tripSpotDetailJob() {
        return new JobBuilder("tripSpotDetailJob", jobRepository)
            .start(tripSpotDetailStep())
            .build();
    }

    @Bean
    public Step tripSpotDetailStep() {
        return new StepBuilder("tripSpotDetailStep", jobRepository)
            .tasklet(tripSpotDetailTasklet, transactionManager)
            .build();
    }
}
