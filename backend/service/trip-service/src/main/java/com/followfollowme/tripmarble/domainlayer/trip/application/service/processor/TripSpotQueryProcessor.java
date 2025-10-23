package com.followfollowme.tripmarble.domainlayer.trip.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.region.application.exception.RegionErrorCode;
import com.followfollowme.tripmarble.domainlayer.region.application.exception.RegionException;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.RegionRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.RepresentativeRegionSigunguMappingRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.SigunguRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.Sigungu;
import com.followfollowme.tripmarble.domainlayer.trip.application.context.RegionContext;
import com.followfollowme.tripmarble.domainlayer.trip.application.exception.TripErrorCode;
import com.followfollowme.tripmarble.domainlayer.trip.application.exception.TripException;
import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripSpotRandomInfo;
import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripSpotSimpleInfo;
import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripSpotWithContentTypeNameInfo;
import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripSpotWithDetailViewInfo;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripContentTypeRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotDetailRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.application.readmodel.TripSpotWithContentTypeName;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TripSpotQueryProcessor {

    private final RepresentativeRegionSigunguMappingRepositoryPort representativeRegionSigunguMappingRepositoryPort;
    private final SigunguRepositoryPort sigunguRepositoryPort;
    private final RegionRepositoryPort regionRepositoryPort;
    private final TripSpotRepositoryPort tripSpotRepositoryPort;
    private final TripSpotDetailRepositoryPort tripSpotDetailRepositoryPort;
    private final TripContentTypeRepositoryPort tripContentTypeRepositoryPort;

    public Slice<TripSpotSimpleInfo> getTripSpotsByRepresentativeRegionId(
        long representativeRegionId, long lastTripSpotId, int size, Integer contentTypeId) {
        RegionContext context = resolveRegionContext(representativeRegionId);

        // 1. 시도 코드 와 시군구 코드 및 지역 코드 기준으로 여행지 Slice 조회 (No-Offset 방식)
        Slice<TripSpot> slice = tripSpotRepositoryPort.findTripSpotsNoOffsetBySigunguCodesAndLastTripSpotId(
            context.regionCode(), context.sigunguCodes(), lastTripSpotId, size, contentTypeId);

        // 2. Slice 의 map 기능으로 Info 변환
        return slice.map(TripSpotSimpleInfo::of);
    }

    public TripSpotWithDetailViewInfo getTripSpotDetailWithContentTypeName(long tripSpotId) {
        // 1. 여행지 정보 ID로 여행지 조회
        TripSpot tripSpot = tripSpotRepositoryPort.findById(tripSpotId)
            .orElseThrow(() -> new TripException(TripErrorCode.TRIP_SPOT_NOT_FOUND));

        // 2. 해당 여행지 정보의 contentId (Tour API 전용 자연키)로 여행지 상세 정보 조회
//        TripSpotDetail tripSpotDetail = tripSpotDetailRepositoryPort.findByContentId(tripSpot.contentId())
//            .orElseThrow(() -> new TripException(TripErrorCode.TRIP_SPOT_DETAIL_NOT_FOUND));

        // 3. 해당 여행지 정보의 contentTypeId (Tour API 전용 자연키)로 관광 타입 정보 조회
        String contentTypeName = tripContentTypeRepositoryPort.findNameByContentTypeId(tripSpot.contentTypeId())
            .orElseThrow(() -> new TripException(TripErrorCode.TRIP_CONTENT_TYPE_NOT_FOUND));

        // 4. 도메인 전용 객체들을 응답 전용 DTO로 매핑
        return TripSpotWithDetailViewInfo.of(tripSpot, contentTypeName);
    }

    public List<TripSpotWithContentTypeNameInfo> getTripSpotsByIds(List<Long> tripSpotIds) {
        List<TripSpotWithContentTypeName> tripSpotWithContentTypeNames =
            tripSpotRepositoryPort.findAllWithContentTypeNameByIds(tripSpotIds);
        return tripSpotWithContentTypeNames.stream()
            .map(TripSpotWithContentTypeNameInfo::of)
            .toList();
    }

    public List<TripSpotRandomInfo> getRandomTripSpots(long representativeRegionId, List<Integer> contentTypeIds, int limit) {
        RegionContext context = resolveRegionContext(representativeRegionId);

        // 1. 지역 코드 및 시도코드, contentTypeId 목록 (Tour API 전용) 기준으로 랜덤 여행지 조회
        List<TripSpot> tripSpots = tripSpotRepositoryPort.findRandomTripSpotsBySigunguCodesAndContentTypeIds(
            context.regionCode(), context.sigunguCodes(), contentTypeIds, limit);

        return tripSpots.stream()
            .map(TripSpotRandomInfo::of)
            .toList();
    }

    private RegionContext resolveRegionContext(long representativeRegionId) {
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

        return RegionContext.builder()
            .regionCode(regionCode)
            .sigunguCodes(sigunguCodes)
            .build();
    }
}
