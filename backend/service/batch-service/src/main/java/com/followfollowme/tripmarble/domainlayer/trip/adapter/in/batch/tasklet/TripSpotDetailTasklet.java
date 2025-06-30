package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.batch.tasklet;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.batch.dto.TripSpotDetailItem;
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
import java.util.concurrent.Executors;

@Slf4j
@Component
@RequiredArgsConstructor
public class TripSpotDetailTasklet implements Tasklet {

    private static final int MAX_ATTEMPTS = 3;
    private static final String CONTENT_ID_PARAM = "contentId";

    // JSON -> TourApiRoot<TripSpotDetailItem> 역직렬화 정보
    private static final ParameterizedTypeReference<TourApiRoot<TripSpotDetailItem>> RESPONSE_TYPE = new ParameterizedTypeReference<>() {
    };
    private final DynamicTourApiClient dynamicTourApiClient;
    private final TripSpotBatchUseCase tripSpotBatchUseCase;

    @Override
    public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
        log.info("[Batch] 공통정보 조회 (trip_spot_detail) Tasklet 실행 시작");

        // 1. 단일 contentId 파라미터 or 전체 조회
        var jobParameters = chunkContext.getStepContext().getStepExecution().getJobParameters();
        String explicitContentId = jobParameters.getString(CONTENT_ID_PARAM);

        List<Integer> contentIds = (explicitContentId != null)
            ? List.of(Integer.valueOf(explicitContentId))
            : tripSpotBatchUseCase.fetchAllContentIds();

        log.info("[Batch] 조회된 contentId 건수: {}", contentIds.size());

        if (contentIds.isEmpty()) {
            log.warn("[Batch] 저장할 trip_spot_detail 대상이 없습니다. 먼저 trip_spot 테이블을 확인해주세요.");
            return RepeatStatus.FINISHED;
        }

        // 2. 가상 스레드 풀로 병렬 처리 (여행지 상세 정보 저장)
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            // 2-1. 각 contentId 별로 비동기 호출
            var futures = contentIds.stream()
                .map(contentId -> executor.submit(() -> fetchAndSave(contentId)))
                .toList();

            for (var f : futures) {
                try {
                    f.get();
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    log.warn("[Batch] 가상스레드 인터럽트 발생", ie);
                } catch (Exception ee) {
                    log.error("[Batch] 가상스레드 처리 실패", ee.getCause());
                }
            }
        }

        log.info("[Batch] TripSpotDetailTasklet 병렬 처리 완료");
        return RepeatStatus.FINISHED;
    }

    private void fetchAndSave(int contentId) {
        // 1. 호출 파라미터 맵
        Map<String, String> params = new HashMap<>();
        params.put(CONTENT_ID_PARAM, String.valueOf(contentId));

        // 2. 재시도 로직
        for (int attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
            try {
                // 가벼운 지연으로 API 과부하 완화
                Thread.sleep(50L);

                var root = dynamicTourApiClient.fetch(TourApi.COMMON_TRIP_SPOT_DETAIL, params, RESPONSE_TYPE);
                var items = root.response().body().items().item();

                if (items != null && !items.isEmpty()) {
                    tripSpotBatchUseCase.registerTripSpotDetails(items);
                    log.info("[Batch][Thread:{}] contentId={} 상세저장 완료",
                        Thread.currentThread().getName(), contentId);
                } else {
                    log.warn("[Batch][Thread:{}] contentId={} 상세정보 없음",
                        Thread.currentThread().getName(), contentId);
                }
                return; // 성공하면 반복문 종료

            } catch (Exception ex) {
                if (attempt == MAX_ATTEMPTS) {
                    log.error("[Batch][Thread:{}] contentId={} 완전 실패 ({}회 시도)",
                        Thread.currentThread().getName(), contentId, MAX_ATTEMPTS, ex);
                } else {
                    log.warn("[Batch][Thread:{}] contentId={} 처리 오류, 재시도 {}/{}",
                        Thread.currentThread().getName(), contentId, attempt, MAX_ATTEMPTS, ex);
                }
            }
        }
    }
}
