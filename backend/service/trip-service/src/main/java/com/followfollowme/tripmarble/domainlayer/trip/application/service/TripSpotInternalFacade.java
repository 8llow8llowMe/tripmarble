package com.followfollowme.tripmarble.domainlayer.trip.application.service;

import com.followfollowme.tripmarble.domainlayer.region.application.exception.RegionErrorCode;
import com.followfollowme.tripmarble.domainlayer.region.application.exception.RegionException;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.RegionRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.RepresentativeRegionSigunguMappingRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.SigunguRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.Sigungu;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripSpotRandomResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.presenter.TripSpotInternalPresenter;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripSpotInternalUseCase;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TripSpotInternalFacade implements TripSpotInternalUseCase {

    private final RepresentativeRegionSigunguMappingRepositoryPort representativeRegionSigunguMappingRepositoryPort;
    private final SigunguRepositoryPort sigunguRepositoryPort;
    private final RegionRepositoryPort regionRepositoryPort;
    private final TripSpotRepositoryPort tripSpotRepositoryPort;
    private final TripSpotInternalPresenter tripSpotInternalPresenter;

    @Override
    @Transactional(readOnly = true)
    public List<TripSpotRandomResponse> getRandomTripSpots(long representativeRegionId, List<Integer> contentTypeIds,
        int limit) {
        // 1. 대표지역 -> 시군구 ID 목록
        List<Long> sigunguIds = representativeRegionSigunguMappingRepositoryPort.findSigunguIdsByRepresentativeRegionId(
            representativeRegionId);

        // 2. 시군구 도메인 조회
        List<Sigungu> sigungus = sigunguRepositoryPort.findAllByIdIn(sigunguIds);

        // 3. 시군구 코드 + 지역 코드 추출 (법정동 시도 코드, 시군구 코드 => 자연키)
        List<Integer> sigunguCodes = sigungus.stream()
            .map(Sigungu::sigunguCode)
            .toList();

        // 4. 시군구 중 하나의 regionId -> regionCode 1개만 조회
        long regionId = sigungus.getFirst().regionId();
        int regionCode = regionRepositoryPort.findById(regionId)
            .orElseThrow(() -> new RegionException(RegionErrorCode.REGION_NOT_FOUND))
            .regionCode();

        // 5. 랜덤 여행지 조회
        List<TripSpot> tripSpots = tripSpotRepositoryPort.findRandomTripSpotsBySigunguCodesAndContentTypeIds(
            regionCode, sigunguCodes, contentTypeIds, limit);

        return tripSpotInternalPresenter.toRandomResponseList(tripSpots);
    }
}
