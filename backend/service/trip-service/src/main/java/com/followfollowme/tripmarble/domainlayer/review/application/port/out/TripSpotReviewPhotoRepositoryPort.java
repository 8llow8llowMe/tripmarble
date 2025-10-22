package com.followfollowme.tripmarble.domainlayer.review.application.port.out;

import com.followfollowme.tripmarble.domainlayer.review.domain.model.TripSpotReview;
import com.followfollowme.tripmarble.domainlayer.review.domain.model.TripSpotReviewPhoto;
import java.util.List;

public interface TripSpotReviewPhotoRepositoryPort {

    List<TripSpotReviewPhoto> saveAll(List<TripSpotReviewPhoto> tripSpotReviewPhotos, TripSpotReview tripSpotReview);

    List<TripSpotReviewPhoto> findByTripSpotReviewIdIn(List<Long> tripSpotReviewIds);

    List<TripSpotReviewPhoto> findByTripSpotReviewId(long tripSpotReviewId);

    void deleteAllByTripSpotReviewId(long tripSpotReviewId);

    int countByMemberId(long memberId);
}
