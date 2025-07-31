package com.followfollowme.tripmarble.domainlayer.trip.application.service;

import com.followfollowme.tripmarble.domainlayer.region.application.port.out.RepresentativeRegionSigunguMappingRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.SigunguRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.Sigungu;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotSimpleResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotWithDetailViewResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.exception.TripErrorCode;
import com.followfollowme.tripmarble.domainlayer.trip.application.exception.TripException;
import com.followfollowme.tripmarble.domainlayer.trip.application.mapper.TripSpotMapper;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripSpotWebUseCase;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripContentTypeRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotDetailRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpotDetail;
import com.followfollowme.tripmarble.persistence.dto.SliceResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TripSpotFacade implements TripSpotWebUseCase {

    private final RepresentativeRegionSigunguMappingRepositoryPort representativeRegionSigunguMappingRepositoryPort;
    private final SigunguRepositoryPort sigunguRepositoryPort;
    private final TripSpotRepositoryPort tripSpotRepositoryPort;
    private final TripSpotDetailRepositoryPort tripSpotDetailRepositoryPort;
    private final TripContentTypeRepositoryPort tripContentTypeRepositoryPort;
    private final TripSpotMapper tripSpotMapper;

    @Override
    @Transactional(readOnly = true)
    public SliceResponse<TripSpotSimpleResponse> getTripSpotsByRepresentativeRegionId(long representativeRegionId,
        long lastTripSpotId, int size, Integer contentTypeId) {
        // 1. 대표지역 -> 시군구 ID 목록
        List<Long> sigunguIds =
            representativeRegionSigunguMappingRepositoryPort.findSigunguIdsByRepresentativeRegionId(
                representativeRegionId);

        // 2. 시군구 ID -> 시군구 코드 변환
        List<Integer> sigunguCodes = sigunguRepositoryPort.findAllByIdIn(sigunguIds).stream()
            .map(Sigungu::sigunguCode)
            .toList();

        // 3. 시군구 코드 기반 여행지 Slice 조회 (No-Offset 방식 - 무한 스크롤)
        Slice<TripSpot> tripSpots = tripSpotRepositoryPort.findTripSpotsNoOffsetBySigunguCodesAndLastTripSpotId(
            sigunguCodes, lastTripSpotId, size, contentTypeId);

        // 4. 도메인 -> Response 매핑
        Slice<TripSpotSimpleResponse> responseSlice = tripSpots.map(tripSpotMapper::toSimpleResponseFromDomain);

        return SliceResponse.of(responseSlice);
    }

    @Override
    @Transactional(readOnly = true)
    public TripSpotWithDetailViewResponse getTripSpotWithDetail(long tripSpotId) {
        // 1. 여행지 정보 조회
        TripSpot tripSpot = tripSpotRepositoryPort.findById(tripSpotId)
            .orElseThrow(() -> new TripException(TripErrorCode.TRIP_SPOT_NOT_FOUND));

        // 2. 해당 여행지 정보의 contentTypeId로 관광 티입 정보 조회 (자연키)
        String contentTypeName = tripContentTypeRepositoryPort.findNameByContentTypeId(tripSpot.contentTypeId())
            .orElseThrow(() -> new TripException(TripErrorCode.TRIP_CONTENT_TYPE_NOT_FOUND));

        // 3. 해당 여행지 정보의 contentId로 여행지 상세 정보 조회 (자연키)
        TripSpotDetail tripSpotDetail = tripSpotDetailRepositoryPort.findByContentId(tripSpot.contentId())
            .orElseThrow(() -> new TripException(TripErrorCode.TRIP_SPOT_DETAIL_NOT_FOUND));

        // 4. Mapper를 통한 응답 DTO 생성
        return tripSpotMapper.toDetailViewResponseFrom(tripSpot, contentTypeName, tripSpotDetail);
    }
}
