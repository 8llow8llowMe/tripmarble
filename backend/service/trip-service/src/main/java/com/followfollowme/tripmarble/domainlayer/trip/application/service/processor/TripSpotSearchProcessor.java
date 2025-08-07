package com.followfollowme.tripmarble.domainlayer.trip.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.region.application.exception.RegionErrorCode;
import com.followfollowme.tripmarble.domainlayer.region.application.exception.RegionException;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.RegionRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.RepresentativeRegionSigunguMappingRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.SigunguRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.Sigungu;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotSimpleResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.presenter.TripSpotPresenter;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import com.followfollowme.tripmarble.persistence.dto.SliceResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripSpotSearchProcessor {

    private final RepresentativeRegionSigunguMappingRepositoryPort representativeRegionSigunguMappingRepositoryPort;
    private final SigunguRepositoryPort sigunguRepositoryPort;
    private final RegionRepositoryPort regionRepositoryPort;
    private final TripSpotRepositoryPort tripSpotRepositoryPort;
    private final TripSpotPresenter tripSpotPresenter;

    public SliceResponse<TripSpotSimpleResponse> searchByRepresentativeRegion(
        long representativeRegionId, long lastTripSpotId, int size, Integer contentTypeId) {
        // 1. 대표지역 ID로 시군구 ID 리스트 조회
        List<Long> sigunguIds = representativeRegionSigunguMappingRepositoryPort.findSigunguIdsByRepresentativeRegionId(
            representativeRegionId);

        // 2. 시군구 ID 리스트로 시군구 도메인 리스트 조회
        List<Sigungu> sigungus = sigunguRepositoryPort.findAllByIdIn(sigunguIds);

        // 3. 시군구 도메인 리스트에서 시군구 코드 리스트 추출 (법정동 시군구 코드 => 자연키)
        List<Integer> sigunguCodes = sigungus.stream()
            .map(Sigungu::sigunguCode)
            .toList();

        // 4. 첫 번째, 시군구의 regionId로 지역 코드 (regionCode) 조회 (법정동 시도 코드 => 자연키)
        long regionId = sigungus.getFirst().regionId();
        int regionCode = regionRepositoryPort.findById(regionId)
            .orElseThrow(() -> new RegionException(RegionErrorCode.REGION_NOT_FOUND))
            .regionCode();

        // 5. 시도 코드 와 시군구 코드 및 지역 코드 기준으로 여행지 Slice 조회 (No-Offset 방식)
        Slice<TripSpot> tripSpots = tripSpotRepositoryPort.findTripSpotsNoOffsetBySigunguCodesAndLastTripSpotId(
            regionCode, sigunguCodes, lastTripSpotId, size, contentTypeId);

        // 6. 도메인 객체 -> Simple 응답 DTO Slice 변환
        return tripSpotPresenter.toSimpleSliceResponse(tripSpots);
    }
}
