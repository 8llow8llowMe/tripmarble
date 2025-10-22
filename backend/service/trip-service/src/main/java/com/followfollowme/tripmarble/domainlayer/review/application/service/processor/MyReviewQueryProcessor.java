package com.followfollowme.tripmarble.domainlayer.review.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.review.application.info.TripSpotReviewAndPhotosInfo;
import com.followfollowme.tripmarble.domainlayer.review.application.info.TripSpotReviewCountInfo;
import com.followfollowme.tripmarble.domainlayer.review.application.port.out.TripSpotReviewPhotoRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.review.application.port.out.TripSpotReviewRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.review.domain.model.TripSpotReview;
import com.followfollowme.tripmarble.domainlayer.review.domain.model.TripSpotReviewPhoto;
import com.followfollowme.tripmarble.domainlayer.review.domain.model.enums.ReviewSourceType;
import com.followfollowme.tripmarble.persistence.enums.OrderType;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MyReviewQueryProcessor {

    private final TripSpotReviewRepositoryPort tripSpotReviewRepositoryPort;
    private final TripSpotReviewPhotoRepositoryPort tripSpotReviewPhotoRepositoryPort;

    public Slice<TripSpotReviewAndPhotosInfo> getMyTripSpotReviews(long memberId, ReviewSourceType sourceType, long lastReviewId, int size,
        OrderType orderType) {
        // 1. 리뷰 Slice 조회
        Slice<TripSpotReview> slice = tripSpotReviewRepositoryPort.findReviewsNoOffsetByMemberId(memberId, sourceType, lastReviewId, size,
            orderType);

        // 2. 리뷰 ID 목록
        List<Long> reviewIds = slice.getContent().stream().map(TripSpotReview::id).toList();

        if (reviewIds.isEmpty()) {
            return slice.map(review -> TripSpotReviewAndPhotosInfo.of(review, List.of()));
        }

        // 3. 사진들 조회 및 매핑
        List<TripSpotReviewPhoto> photos = tripSpotReviewPhotoRepositoryPort.findByTripSpotReviewIdIn(reviewIds);
        Map<Long, List<TripSpotReviewPhoto>> photoMap = photos.stream()
            .collect(Collectors.groupingBy(TripSpotReviewPhoto::tripSpotReviewId));

        // 4. Info 반환
        return slice.map(review -> TripSpotReviewAndPhotosInfo.of(review, photoMap.getOrDefault(review.id(), List.of())));
    }

    public TripSpotReviewCountInfo getMyTripSpotReviewAndPhotoCount(long memberId) {
        int tripSpotReviewCount = tripSpotReviewRepositoryPort.countByMemberId(memberId);
        int photoCount = tripSpotReviewPhotoRepositoryPort.countByMemberId(memberId);
        
        return TripSpotReviewCountInfo.builder()
            .tripSpotReviewCount(tripSpotReviewCount)
            .photoCount(photoCount)
            .build();
    }
}
