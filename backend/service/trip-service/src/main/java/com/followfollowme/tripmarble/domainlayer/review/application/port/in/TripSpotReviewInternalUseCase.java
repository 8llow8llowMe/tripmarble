package com.followfollowme.tripmarble.domainlayer.review.application.port.in;

import com.followfollowme.tripmarble.domainlayer.review.adapter.in.internal.dto.TripSpotReviewCountInternalResponse;
import com.followfollowme.tripmarble.domainlayer.review.adapter.in.internal.dto.TripSpotReviewCreateInternalResponse;
import com.followfollowme.tripmarble.domainlayer.review.application.command.TripSpotReviewCreateInternalCommand;

public interface TripSpotReviewInternalUseCase {

    TripSpotReviewCreateInternalResponse createMissionReview(long tripSpotId, long memberId, TripSpotReviewCreateInternalCommand command);

    TripSpotReviewCountInternalResponse getMyTripSpotReviewAndPhotoCount(long memberId);
}
