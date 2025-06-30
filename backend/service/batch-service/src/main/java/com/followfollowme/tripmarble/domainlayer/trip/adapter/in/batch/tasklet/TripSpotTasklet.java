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
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executors;
import java.util.stream.IntStream;

@Slf4j
@Component
@RequiredArgsConstructor
public class TripSpotTasklet implements Tasklet {

    private static final int MAX_ATTEMPTS = 3;
    private static final int PAGE_SIZE = 100;
    private static final ParameterizedTypeReference<TourApiRoot<TripSpotItem>> RESPONSE_TYPE =
        new ParameterizedTypeReference<>() {
        };
    private final DynamicTourApiClient dynamicTourApiClient;
    private final TripSpotBatchUseCase tripSpotBatchUseCase;

    @Override
    public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
        log.info("[Batch] 지역기반 관광정보 조회 (trip_spot) Tasklet 실행 시작");

        // 1. Job 파라미터에서 정렬, 여행 콘텐츠 타입 추출
        var jobParameters = chunkContext.getStepContext().getStepExecution().getJobParameters();
        String arrange = jobParameters.getString("arrange"); // 예: A (제목순)
        String contentTypeId = jobParameters.getString("contentTypeId"); // 예: 12 (관광지)

        // 2. 공통 query 파라미터 준비
        Map<String, String> baseParams = new HashMap<>();
        if (arrange != null) baseParams.put("arrange", arrange);
        if (contentTypeId != null) baseParams.put("contentTypeId", contentTypeId);

        // 3. 첫 페이지에서 총 건수, 페이지 수 조회 (default pageNo = 1) 및 totalCount, totalPages 계산
        TourApiRoot<TripSpotItem> first = dynamicTourApiClient.fetch(TourApi.REGION_BASED_TRIP_SPOT_LIST, baseParams, RESPONSE_TYPE);
        int totalCount = first.response().body().totalCount();
        int totalPages = (int) Math.ceil(totalCount / 100.0);
        log.info("[Batch] 전체 건수={}, 총 페이지={}", totalCount, totalPages);

        // 4. 가상스레드 풀 + IntStream 으로 병렬 처리
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            var futures = IntStream.rangeClosed(1, totalPages)
                .mapToObj(page -> executor.submit(() -> fetchAndSavePage(page, baseParams)))
                .toList();

            for (var f : futures) {
                try {
                    f.get();
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    log.warn("[Batch] 가상스레드 인터럽트 발생", ie);
                } catch (ExecutionException ee) {
                    log.error("[Batch] 페이지 처리 실패", ee.getCause());
                }
            }
        }

        log.info("[Batch] TripSpotTasklet 모든 페이지 병렬 처리 완료");
        return RepeatStatus.FINISHED;
    }

    private void fetchAndSavePage(int pageNo, Map<String, String> baseParams) {

        // 매 호출마다 새로운 파라미터 맵
        var params = new HashMap<>(baseParams);
        params.put("pageNo", String.valueOf(pageNo));

        for (int attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
            try {
                // 페이지당 지연 주기 (API 과부하 완화)
                Thread.sleep(pageNo * 50L);

                var root = dynamicTourApiClient.fetch(TourApi.REGION_BASED_TRIP_SPOT_LIST, params, RESPONSE_TYPE);
                var items = root.response().body().items().item();

                if (items != null && !items.isEmpty()) {
                    tripSpotBatchUseCase.registerTripSpots(items);
                    log.info("[Batch][Thread:{}] 페이지 {} 저장 완료 ({}건)",
                        Thread.currentThread().getName(), pageNo, items.size());
                } else {
                    log.warn("[Batch][Thread:{}] 페이지 {} 데이터 없음",
                        Thread.currentThread().getName(), pageNo);
                }
                return; // 성공 시 루프 종료

            } catch (Exception ex) {
                if (attempt == MAX_ATTEMPTS) {
                    log.error("[Batch][Thread:{}] 페이지 {} 완전 실패 ({}회 시도) ",
                        Thread.currentThread().getName(), pageNo, attempt, ex);
                } else {
                    log.warn("[Batch][Thread:{}] 페이지 {} 처리 오류, 재시도 {}/{}",
                        Thread.currentThread().getName(), pageNo, attempt, MAX_ATTEMPTS, ex);
                }
            }
        }
    }
}
