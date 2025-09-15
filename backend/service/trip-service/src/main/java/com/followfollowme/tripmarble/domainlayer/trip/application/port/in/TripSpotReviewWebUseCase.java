package com.followfollowme.tripmarble.domainlayer.trip.application.port.in;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotReviewAndPhotosResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotReviewCreateResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotReviewSummaryResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.command.TripSpotReviewCreateCommand;
import com.followfollowme.tripmarble.persistence.dto.SliceResponse;

public interface TripSpotReviewWebUseCase {

    TripSpotReviewCreateResponse createGeneralReviewAndPhotos(long tripSpotId, long memberId, TripSpotReviewCreateCommand command);

    TripSpotReviewSummaryResponse getTripSpotReviewSummary(long tripSpotId, int photoLimit);

    SliceResponse<TripSpotReviewAndPhotosResponse> getTripSpotReviews(long tripSpotId, long lastTripSpotReviewId, int size);
}
