package com.followfollowme.tripmarble.domainlayer.trip.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotWithDetailViewResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.presenter.TripSpotPresenter;
import com.followfollowme.tripmarble.domainlayer.trip.application.exception.TripErrorCode;
import com.followfollowme.tripmarble.domainlayer.trip.application.exception.TripException;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripContentTypeRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotDetailRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpotDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripSpotDetailProcessor {

    private final TripSpotRepositoryPort tripSpotRepositoryPort;
    private final TripSpotDetailRepositoryPort tripSpotDetailRepositoryPort;
    private final TripContentTypeRepositoryPort tripContentTypeRepositoryPort;
    private final TripSpotPresenter tripSpotPresenter;

    public TripSpotWithDetailViewResponse readDetail(long tripSpotId) {
        // 1. 여행지 정보 ID로 여행지 조회
        TripSpot tripSpot = tripSpotRepositoryPort.findById(tripSpotId)
            .orElseThrow(() -> new TripException(TripErrorCode.TRIP_SPOT_NOT_FOUND));

        // 2. 해당 여행지 정보의 contentId (Tour API 전용 자연키)로 여행지 상세 정보 조회
        TripSpotDetail tripSpotDetail = tripSpotDetailRepositoryPort.findByContentId(tripSpot.contentId())
            .orElseThrow(() -> new TripException(TripErrorCode.TRIP_SPOT_DETAIL_NOT_FOUND));

        // 3. 해당 여행지 정보의 contentTypeId (Tour API 전용 자연키)로 관광 타입 정보 조회
        String contentTypeName = tripContentTypeRepositoryPort.findNameByContentTypeId(tripSpot.contentTypeId())
            .orElseThrow(() -> new TripException(TripErrorCode.TRIP_CONTENT_TYPE_NOT_FOUND));

        // 4. 도메인 전용 객체들을 응답 전용 DTO로 매핑
        return tripSpotPresenter.toDetailViewResponse(tripSpot, tripSpotDetail, contentTypeName);
    }
}
