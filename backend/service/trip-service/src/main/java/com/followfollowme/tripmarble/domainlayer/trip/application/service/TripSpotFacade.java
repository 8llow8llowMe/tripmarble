package com.followfollowme.tripmarble.domainlayer.trip.application.service;

import com.followfollowme.tripmarble.domainlayer.region.application.port.out.RepresentativeRegionSigunguMappingRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.SigunguRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.Sigungu;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotSimpleResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotWithDetailViewResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.mapper.TripSpotMapper;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripSpotInternalUseCase;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripSpotWebUseCase;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripContentTypeRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotDetailRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpotDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TripSpotFacade implements TripSpotWebUseCase, TripSpotInternalUseCase {

    private final RepresentativeRegionSigunguMappingRepositoryPort representativeRegionSigunguMappingRepositoryPort;
    private final SigunguRepositoryPort sigunguRepositoryPort;
    private final TripSpotRepositoryPort tripSpotRepositoryPort;
    private final TripSpotDetailRepositoryPort tripSpotDetailRepositoryPort;
    private final TripContentTypeRepositoryPort tripContentTypeRepositoryPort;
    private final TripSpotMapper tripSpotMapper;

    @Override
    @Transactional(readOnly = true)
    public List<TripSpotSimpleResponse> getTripSpotsByRepresentativeRegionId(long representativeRegionId) {
        // 1. 매핑된 시군구 ID 조회
        List<Long> sigunguIds =
            representativeRegionSigunguMappingRepositoryPort.findSigunguIdsByRepresentativeRegionId(representativeRegionId);

        // 2. 시군구 코드 조회 (도메인 -> 시군구 코드 변환)
        List<Sigungu> sigungus = sigunguRepositoryPort.findAllByIdIn(sigunguIds);
        List<Integer> ldongSigunguCodes = sigungus.stream()
            .map(Sigungu::sigunguCode)
            .toList();

        // 3. 시군구 코드로 여행지 정보 목록 조회
        List<TripSpot> tripSpots = tripSpotRepositoryPort.findAllByLdongSignguCdIn(ldongSigunguCodes);
        return tripSpotMapper.toSimpleResponseListFromDomainList(tripSpots);
    }

    @Override
    @Transactional(readOnly = true)
    public TripSpotWithDetailViewResponse getTripSpotWithDetail(long tripSpotId) {
        // 1. 여행지 정보 조회
        TripSpot tripSpot = tripSpotRepositoryPort.findById(tripSpotId)
            .orElseThrow(() -> new IllegalArgumentException("해당 여행지 정보를 찾을 수 없습니다: " + tripSpotId));

        // 2. 해당 여행지 정보의 contentTypeId로 관광 티입 정보 조회 (자연키)
        String contentTypeName = tripContentTypeRepositoryPort.findNameByContentTypeId(tripSpot.contentTypeId())
            .orElseThrow(() -> new IllegalArgumentException("해당 여행지 콘텐츠 타입 (관광 타입)을 찾을 수 없습니다: " + tripSpot.contentTypeId()));

        // 3. 해당 여행지 정보의 contentId로 여행지 상세 정보 조회 (자연키)
        TripSpotDetail tripSpotDetail = tripSpotDetailRepositoryPort.findByContentId(tripSpot.contentId())
            .orElseThrow(() -> new IllegalArgumentException("해당 여행지 정보를 찾을 수 없습니다: " + tripSpot.contentId()));

        // 4. Mapper를 통한 응답 DTO 생성
        return tripSpotMapper.toDetailViewResponseFrom(tripSpot, contentTypeName, tripSpotDetail);
    }
}
