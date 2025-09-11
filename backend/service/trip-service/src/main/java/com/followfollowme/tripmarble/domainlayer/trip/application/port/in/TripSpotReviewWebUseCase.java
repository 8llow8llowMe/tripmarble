package com.followfollowme.tripmarble.domainlayer.trip.application.port.in;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotReviewCreateResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.command.TripSpotReviewCreateCommand;

public interface TripSpotReviewWebUseCase {

    TripSpotReviewCreateResponse createGeneralReviewAndPhotos(long tripSpotId, long memberId, TripSpotReviewCreateCommand command);
}
