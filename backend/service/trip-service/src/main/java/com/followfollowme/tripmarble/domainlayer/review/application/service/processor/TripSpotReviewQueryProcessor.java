package com.followfollowme.tripmarble.domainlayer.review.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.review.adapter.out.feign.dto.MemberProfileInternalResponse;
import com.followfollowme.tripmarble.domainlayer.review.application.info.MemberProfileInfo;
import com.followfollowme.tripmarble.domainlayer.review.application.info.TripSpotReviewAndPhotosInfo;
import com.followfollowme.tripmarble.domainlayer.review.application.info.TripSpotReviewDetailInfo;
import com.followfollowme.tripmarble.domainlayer.review.application.info.TripSpotReviewSummaryInfo;
import com.followfollowme.tripmarble.domainlayer.review.application.port.out.MemberClientPort;
import com.followfollowme.tripmarble.domainlayer.review.application.port.out.TripSpotReviewPhotoRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.review.application.port.out.TripSpotReviewRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.review.application.readmodel.TripSpotReviewSummary;
import com.followfollowme.tripmarble.domainlayer.review.domain.model.TripSpotReview;
import com.followfollowme.tripmarble.domainlayer.review.domain.model.TripSpotReviewPhoto;
import com.followfollowme.tripmarble.domainlayer.trip.application.exception.TripErrorCode;
import com.followfollowme.tripmarble.domainlayer.trip.application.exception.TripException;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
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
    private final TripSpotRepositoryPort tripSpotRepositoryPort;
    private final MemberClientPort memberClientPort;

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

    public TripSpotReviewDetailInfo getTripSpotReviewDetail(long tripSpotId, long tripSpotReviewId) {
        // 1. 여행지 정보 조회
        TripSpot tripSpot = tripSpotRepositoryPort.findById(tripSpotId)
            .orElseThrow(() -> new TripException(TripErrorCode.TRIP_SPOT_NOT_FOUND));

        // 2. 리뷰 조회
        TripSpotReview review = tripSpotReviewRepositoryPort.findById(tripSpotReviewId)
            .orElseThrow(() -> new TripException(TripErrorCode.TRIP_SPOT_REVIEW_NOT_FOUND));

        // 3. 사진 조회
        List<TripSpotReviewPhoto> photos = tripSpotReviewPhotoRepositoryPort.findByTripSpotReviewId(tripSpotReviewId);

        // 4. 작성자 프로필 조회 (내부 서비스 통신)
        MemberProfileInternalResponse response = memberClientPort.getMemberProfile(review.memberId());
        MemberProfileInfo member = MemberProfileInfo.from(response);

        return TripSpotReviewDetailInfo.of(tripSpot, review, photos, member);
    }
}
