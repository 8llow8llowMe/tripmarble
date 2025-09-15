package com.followfollowme.tripmarble.domainlayer.trip.application.port.out;

import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpotReview;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpotReviewPhoto;
import java.util.List;

public interface TripSpotReviewPhotoRepositoryPort {

    List<TripSpotReviewPhoto> saveAll(List<TripSpotReviewPhoto> tripSpotReviewPhotos, TripSpotReview tripSpotReview);

    List<TripSpotReviewPhoto> findByTripSpotReviewIdIn(List<Long> tripSpotReviewIds);
}
