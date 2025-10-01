package com.followfollowme.tripmarble.domainlayer.review.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.review.application.exception.ReviewErrorCode;
import com.followfollowme.tripmarble.domainlayer.review.application.exception.ReviewException;
import com.followfollowme.tripmarble.domainlayer.review.application.port.out.TripSpotReviewPhotoRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.review.application.port.out.TripSpotReviewRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.review.domain.model.TripSpotReview;
import com.followfollowme.tripmarble.domainlayer.review.domain.model.TripSpotReviewPhoto;
import com.followfollowme.tripmarble.storage.util.MinioFileRemover;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MyReviewDeleteProcessor {

    private final TripSpotReviewRepositoryPort tripSpotReviewRepositoryPort;
    private final TripSpotReviewPhotoRepositoryPort tripSpotReviewPhotoRepositoryPort;
    private final MinioFileRemover minioFileRemover;

    public void deleteMyTripSpotReview(long tripSpotReviewId, long memberId) {
        // 1. 리뷰 존재 여부 검증
        TripSpotReview review = tripSpotReviewRepositoryPort.findById(tripSpotReviewId)
            .orElseThrow(() -> new ReviewException(ReviewErrorCode.TRIP_SPOT_REVIEW_NOT_FOUND));

        // 2. 본인 리뷰인지 검증
        if (review.memberId() != memberId) {
            throw new ReviewException(ReviewErrorCode.REVIEW_FORBIDDEN);
        }

        // 3. 리뷰에 연결된 사진 조회
        List<TripSpotReviewPhoto> photos = tripSpotReviewPhotoRepositoryPort.findByTripSpotReviewId(tripSpotReviewId);

        // 4. MinIO에서 물리 파일 삭제
        photos.forEach(photo -> minioFileRemover.remove(photo.photoUrl()));

        // 5. 사진 DB 삭제
        tripSpotReviewPhotoRepositoryPort.deleteAllByTripSpotReviewId(tripSpotReviewId);

        // 6. 리뷰 DB 삭제
        tripSpotReviewRepositoryPort.deleteById(tripSpotReviewId);
    }
}
