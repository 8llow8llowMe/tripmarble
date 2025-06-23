package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.batch.tasklet;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.batch.dto.TripSpotItem;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripSpotBatchUseCase;
import com.followfollowme.tripmarble.global.infra.tourapi.DynamicTourApiClient;
import com.followfollowme.tripmarble.global.infra.tourapi.TourApiRoot;
import com.followfollowme.tripmarble.global.infra.tourapi.eums.TourApi;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class TripSpotTasklet implements Tasklet {

    private final DynamicTourApiClient dynamicTourApiClient;
    private final TripSpotBatchUseCase tripSpotBatchUseCase;

    @Override
    public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
        log.info("[Batch] 지역기반 관광정보 조회 Tasklet 실행 시작");

        var jobParameters = chunkContext.getStepContext().getStepExecution().getJobParameters();
        String arrange = jobParameters.getString("arrange"); // 예: A (제목순)
        String contentTypeId = jobParameters.getString("contentTypeId"); // 예: 12 (관광지)

        Map<String, String> params = new HashMap<>();
        if (arrange != null) params.put("arrange", arrange);
        if (contentTypeId != null) params.put("contentTypeId", contentTypeId);

        ParameterizedTypeReference<TourApiRoot<TripSpotItem>> responseType = new ParameterizedTypeReference<>() {
        };
        TourApiRoot<TripSpotItem> root = dynamicTourApiClient.fetch(TourApi.REGION_BASED_TRIP_SPOT_LIST, params, responseType);

        List<TripSpotItem> items = root.response().body().items().item();

        tripSpotBatchUseCase.registerTripSpots(items);

        log.info("[Batch] 지역기반 관광정보 수신 완료 - {}건", items.size());
        return RepeatStatus.FINISHED;
    }
}
