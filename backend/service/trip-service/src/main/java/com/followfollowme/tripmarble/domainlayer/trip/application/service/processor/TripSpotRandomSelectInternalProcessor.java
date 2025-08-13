package com.followfollowme.tripmarble.domainlayer.trip.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.region.application.exception.RegionErrorCode;
import com.followfollowme.tripmarble.domainlayer.region.application.exception.RegionException;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.RegionRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.RepresentativeRegionSigunguMappingRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.SigunguRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.Sigungu;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripSpotRandomInternalResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.presenter.TripSpotInternalPresenter;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripSpotRandomSelectInternalProcessor {

    private final RepresentativeRegionSigunguMappingRepositoryPort representativeRegionSigunguMappingRepositoryPort;
    private final SigunguRepositoryPort sigunguRepositoryPort;
    private final RegionRepositoryPort regionRepositoryPort;
    private final TripSpotRepositoryPort tripSpotRepositoryPort;
    private final TripSpotInternalPresenter tripSpotInternalPresenter;

    public List<TripSpotRandomInternalResponse> getRandomTripSpots(long representativeRegionId, List<Integer> contentTypeIds, int limit) {
        // 1. 대표지역 ID를 이용하여 시군구 ID 목록 조회
        List<Long> sigunguIds =
            representativeRegionSigunguMappingRepositoryPort.findSigunguIdsByRepresentativeRegionId(representativeRegionId);

        // 2. 시군구 도메인 조회
        List<Sigungu> sigungus = sigunguRepositoryPort.findAllByIdIn(sigunguIds);

        // 3. 시군구 코드 추출 (법정동 시군구 코드 => 자연키)
        List<Integer> sigunguCodes = sigungus.stream()
            .map(Sigungu::sigunguCode)
            .toList();

        // 4. 첫 번째, 시군구의 regionId로 지역 코드 (regionCode) 조회 (법정동 시도 코드 => 자연키)
        long regionId = sigungus.getFirst().regionId();
        int regionCode = regionRepositoryPort.findById(regionId)
            .orElseThrow(() -> new RegionException(RegionErrorCode.REGION_NOT_FOUND))
            .regionCode();

        // 5. 지역 코드 및 시도코드, contentTypeId 목록 (Tour API 전용) 기준으로 랜덤 여행지 조회
        List<TripSpot> tripSpots = tripSpotRepositoryPort.findRandomTripSpotsBySigunguCodesAndContentTypeIds(
            regionCode, sigunguCodes, contentTypeIds, limit);

        // 6. 도메인 객체 -> 응답 DTO 리스트로 변환
        return tripSpotInternalPresenter.toRandomResponseList(tripSpots);
    }
}
