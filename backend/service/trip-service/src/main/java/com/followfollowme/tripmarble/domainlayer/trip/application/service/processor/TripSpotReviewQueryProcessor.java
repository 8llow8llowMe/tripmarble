package com.followfollowme.tripmarble.domainlayer.trip.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripSpotReviewAndPhotosInfo;
import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripSpotReviewSummaryInfo;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotReviewPhotoRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotReviewRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.application.readmodel.TripSpotReviewSummary;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpotReview;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpotReviewPhoto;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripSpotReviewQueryProcessor {

    private final TripSpotReviewRepositoryPort tripSpotReviewRepositoryPort;
    private final TripSpotReviewPhotoRepositoryPort tripSpotReviewPhotoRepositoryPort;

    public TripSpotReviewSummaryInfo getTripSpotReviewSummary(long tripSpotId, int photoLimit) {
        TripSpotReviewSummary summary = tripSpotReviewRepositoryPort.findSummaryByTripSpotId(tripSpotId, photoLimit);
        return TripSpotReviewSummaryInfo.of(summary);
    }

    public Slice<TripSpotReviewAndPhotosInfo> getTripSpotReviews(long tripSpotId, long lastTripSpotReviewId, int size) {
        // 1. 리뷰 Slice 조회 (No-Offset 방식)
        Slice<TripSpotReview> slice = tripSpotReviewRepositoryPort.findReviewsNoOffsetByTripSpotId(tripSpotId, lastTripSpotReviewId, size);

        // 2. 리뷰 ID 추출
        List<Long> reviewIds = slice.getContent().stream()
            .map(TripSpotReview::id)
            .toList();

        if (reviewIds.isEmpty()) {
            return slice.map(review -> TripSpotReviewAndPhotosInfo.of(review, List.of()));
        }

        // 3. 리뷰 ID 리스트로 사진들 한 번에 조회
        List<TripSpotReviewPhoto> photos =
            tripSpotReviewPhotoRepositoryPort.findByTripSpotReviewIdIn(reviewIds);

        // 4. 리뷰 ID 별로 사진들을 그룹핑
        Map<Long, List<TripSpotReviewPhoto>> photoMap = photos.stream()
            .collect(Collectors.groupingBy(TripSpotReviewPhoto::tripSpotReviewId));

        // 5. Slice 의 map 기능으로 Info 변환
        return slice.map(review -> TripSpotReviewAndPhotosInfo.of(review, photoMap.getOrDefault(review.id(), List.of())));
    }
}
