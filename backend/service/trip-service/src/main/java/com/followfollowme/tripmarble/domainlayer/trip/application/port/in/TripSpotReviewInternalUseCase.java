package com.followfollowme.tripmarble.domainlayer.trip.application.port.in;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripSpotReviewCreateInternalResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.command.TripSpotReviewCreateInternalCommand;

public interface TripSpotReviewInternalUseCase {

    TripSpotReviewCreateInternalResponse createMissionReview(long tripSpotId, long memberId, TripSpotReviewCreateInternalCommand command);
}
