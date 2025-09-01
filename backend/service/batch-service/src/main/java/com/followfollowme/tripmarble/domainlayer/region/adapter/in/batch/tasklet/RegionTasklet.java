package com.followfollowme.tripmarble.domainlayer.region.adapter.in.batch.tasklet;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.batch.dto.RegionItem;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.batch.dto.SigunguItem;
import com.followfollowme.tripmarble.domainlayer.region.application.port.in.RegionWebUseCase;
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
public class RegionTasklet implements Tasklet {

    private final DynamicTourApiClient dynamicTourApiClient;
    private final RegionWebUseCase regionWebUseCase;

    @Override
    public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
        log.info("[Batch] RegionTasklet 실행 시작");

        // 1. 배치 Job 파라미터에서 지역코드 (시도코드) 및 법정동 목록 조회 여부 파라미터 추출 (chunkContext 이용해서)
        var jobParameters = chunkContext.getStepContext().getStepExecution().getJobParameters();
        String regionCode = jobParameters.getString("regionCode");
        String listYn = jobParameters.getString("listYn");

        if (regionCode != null && listYn != null) {
            // 법정동 코드 조회
            Map<String, String> params = new HashMap<>();
            params.put("lDongRegnCd", regionCode);
            params.put("lDongListYn", listYn);

            ParameterizedTypeReference<TourApiRoot<SigunguItem>> responseType = new ParameterizedTypeReference<>() {
            };
            TourApiRoot<SigunguItem> root = dynamicTourApiClient.fetch(TourApi.SIGUNGU_CODE, params, responseType);

            List<SigunguItem> items = root.response().body().items().item();
            regionWebUseCase.registerSigungus(items);
            log.info("[Batch] 법정동 저장 완료 - {}건", items.size());

        } else {
            // 시도 코드 조회
            ParameterizedTypeReference<TourApiRoot<RegionItem>> responseType = new ParameterizedTypeReference<>() {
            };
            TourApiRoot<RegionItem> root = dynamicTourApiClient.fetch(TourApi.REGION_CODE, responseType);

            List<RegionItem> items = root.response().body().items().item();
            regionWebUseCase.registerRegions(items);
            log.info("[Batch] 시도 저장 완료 - {}건", items.size());
        }

        return RepeatStatus.FINISHED;
    }
}
