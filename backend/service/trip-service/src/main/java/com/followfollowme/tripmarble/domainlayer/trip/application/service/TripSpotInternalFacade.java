package com.followfollowme.tripmarble.domainlayer.trip.application.service;

import com.followfollowme.tripmarble.domainlayer.region.application.port.out.RepresentativeRegionSigunguMappingRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.SigunguRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.Sigungu;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripSpotRandomResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.mapper.TripSpotMapper;
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
    private final TripSpotRepositoryPort tripSpotRepositoryPort;
    private final TripSpotMapper tripSpotMapper;

    @Override
    @Transactional(readOnly = true)
    public List<TripSpotRandomResponse> getRandomTripSpots(long representativeRegionId, List<Integer> contentTypeIds,
        int limit) {
        // 1. 대표지역 -> 시군구 ID 목록
        List<Long> sigunguIds = representativeRegionSigunguMappingRepositoryPort.findSigunguIdsByRepresentativeRegionId(
            representativeRegionId);

        // 2. 시군구 ID -> 시군구 코드 변환
        List<Integer> sigunguCodes = sigunguRepositoryPort.findAllByIdIn(sigunguIds).stream()
            .map(Sigungu::sigunguCode)
            .toList();

        // 3. 랜덤 여행지 조회
        List<TripSpot> tripSpots = tripSpotRepositoryPort.findRandomTripSpotsBySigunguCodesAndContentTypeIds(
            sigunguCodes, contentTypeIds, limit);
        return tripSpotMapper.toRandomResponseListFromDomainList(tripSpots);
    }
}
