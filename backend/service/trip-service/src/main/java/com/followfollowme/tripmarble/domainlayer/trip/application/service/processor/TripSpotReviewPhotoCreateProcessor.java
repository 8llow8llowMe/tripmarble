package com.followfollowme.tripmarble.domainlayer.trip.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.trip.application.exception.TripErrorCode;
import com.followfollowme.tripmarble.domainlayer.trip.application.exception.TripException;
import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripSpotReviewPhotoCreateInfo;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotReviewPhotoRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotReviewRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpotReview;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpotReviewPhoto;
import com.followfollowme.tripmarble.persistence.util.SnowflakeIdGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.IntStream;

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
            .orElseThrow(() -> new TripException(TripErrorCode.TRIP_SPOT_REVIEW_NOT_FOUND));

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
