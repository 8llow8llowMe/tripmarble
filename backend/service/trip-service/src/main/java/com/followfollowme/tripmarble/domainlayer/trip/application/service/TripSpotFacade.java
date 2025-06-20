package com.followfollowme.tripmarble.domainlayer.trip.application.service;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotWithDetailViewResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripSpotInternalUseCase;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripSpotWebUseCase;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotDetailRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpotDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TripSpotFacade implements TripSpotWebUseCase, TripSpotInternalUseCase {

    private final TripSpotRepositoryPort tripSpotRepositoryPort;
    private final TripSpotDetailRepositoryPort tripSpotDetailRepositoryPort;

    @Override
    @Transactional(readOnly = true)
    public TripSpotWithDetailViewResponse getTripSpotWithDetail(long tripSpotId) {
        TripSpot tripSpot = tripSpotRepositoryPort.findById(tripSpotId)
            .orElseThrow(() -> new IllegalArgumentException("해당 여행지 정보를 찾을 수 없습니다: " + tripSpotId));

        TripSpotDetail tripSpotDetail = tripSpotDetailRepositoryPort.findByContentId(
                tripSpot.contentId())
            .orElseThrow(() -> new IllegalArgumentException(
                "해당 여행지 정보를 찾을 수 없습니다: " + tripSpot.contentId()));

        // TODO: 여행지 상세 정보 Response DTO 정의
        return TripSpotWithDetailViewResponse.builder()
            .build();
    }
}
