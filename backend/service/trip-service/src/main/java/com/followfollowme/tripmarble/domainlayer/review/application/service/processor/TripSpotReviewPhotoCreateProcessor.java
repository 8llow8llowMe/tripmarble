package com.followfollowme.tripmarble.domainlayer.review.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.review.application.exception.ReviewErrorCode;
import com.followfollowme.tripmarble.domainlayer.review.application.exception.ReviewException;
import com.followfollowme.tripmarble.domainlayer.review.application.info.TripSpotReviewPhotoCreateInfo;
import com.followfollowme.tripmarble.domainlayer.review.application.port.out.TripSpotReviewPhotoRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.review.application.port.out.TripSpotReviewRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.review.domain.model.TripSpotReview;
import com.followfollowme.tripmarble.domainlayer.review.domain.model.TripSpotReviewPhoto;
import com.followfollowme.tripmarble.persistence.util.SnowflakeIdGenerator;
import java.util.List;
import java.util.stream.IntStream;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripSpotReviewPhotoCreateProcessor {

    private final TripSpotReviewRepositoryPort tripSpotReviewRepositoryPort;
    private final TripSpotReviewPhotoRepositoryPort tripSpotReviewPhotoRepository;
    private final SnowflakeIdGenerator snowflakeIdGenerator;

    public List<TripSpotReviewPhotoCreateInfo> createPhotos(long tripSpotReviewId, List<String> photoUrls) {
        if (photoUrls == null || photoUrls.isEmpty()) {
            return List.of();
        }

        // 1. 리뷰 존재 확인
        TripSpotReview review = tripSpotReviewRepositoryPort.findById(tripSpotReviewId)
            .orElseThrow(() -> new ReviewException(ReviewErrorCode.TRIP_SPOT_REVIEW_NOT_FOUND));

        // 2. 도메인 객체 리스트 생성
        List<TripSpotReviewPhoto> photos = IntStream.range(0, photoUrls.size())
            .mapToObj(i -> TripSpotReviewPhoto.builder()
                .id(snowflakeIdGenerator.generateId())
                .tripSpotReviewId(review.id())
                .photoUrl(photoUrls.get(i))
                .orderNo(i + 1) // 순서 지정
                .build())
            .toList();

        // 3. 저장
        List<TripSpotReviewPhoto> savedPhotos = tripSpotReviewPhotoRepository.saveAll(photos, review);

        // 4. Info 반환
        return savedPhotos.stream()
            .map(TripSpotReviewPhotoCreateInfo::of)
            .toList();
    }
}
