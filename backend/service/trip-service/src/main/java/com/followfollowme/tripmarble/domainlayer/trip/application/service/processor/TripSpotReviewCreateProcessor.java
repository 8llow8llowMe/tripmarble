package com.followfollowme.tripmarble.domainlayer.trip.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.trip.application.exception.TripErrorCode;
import com.followfollowme.tripmarble.domainlayer.trip.application.exception.TripException;
import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripSpotReviewCreateInfo;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotReviewRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpotReview;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.enums.ReviewSourceType;
import com.followfollowme.tripmarble.persistence.util.SnowflakeIdGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripSpotReviewCreateProcessor {

    private final TripSpotRepositoryPort tripSpotRepositoryPort;
    private final TripSpotReviewRepositoryPort tripSpotReviewRepositoryPort;
    private final SnowflakeIdGenerator snowflakeIdGenerator;

    public TripSpotReviewCreateInfo createGeneralReview(long tripSpotId, long memberId, String content, double rating) {
        return createReview(tripSpotId, memberId, content, rating, ReviewSourceType.GENERAL);
    }

    public TripSpotReviewCreateInfo createMissionReview(long tripSpotId, long memberId, String content, double rating) {
        return createReview(tripSpotId, memberId, content, rating, ReviewSourceType.GAME_MISSION);
    }

    private TripSpotReviewCreateInfo createReview(
        long tripSpotId, long memberId, String content, double rating, ReviewSourceType sourceType) {
        // 1. 여행지 존재 검증
        TripSpot tripSpot = tripSpotRepositoryPort.findById(tripSpotId)
            .orElseThrow(() -> new TripException(TripErrorCode.TRIP_SPOT_NOT_FOUND));

        // 2. 리뷰 생성
        TripSpotReview tripSpotReview = TripSpotReview.builder()
            .id(snowflakeIdGenerator.generateId())
            .tripSpotId(tripSpotId)
            .memberId(memberId)
            .content(content)
            .rating(rating)
            .sourceType(sourceType)
            .build();

        // 3. 저장
        TripSpotReview saved = tripSpotReviewRepositoryPort.save(tripSpotReview, tripSpot);

        // 4. Info 반환
        return TripSpotReviewCreateInfo.of(saved);
    }
}

