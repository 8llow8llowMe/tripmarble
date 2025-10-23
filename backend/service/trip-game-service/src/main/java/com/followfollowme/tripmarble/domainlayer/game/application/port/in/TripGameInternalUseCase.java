package com.followfollowme.tripmarble.domainlayer.game.application.port.in;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.internal.dto.TripGameCountInternalResponse;

public interface TripGameInternalUseCase {

    TripGameCountInternalResponse getTripGameCountByMember(long memberId);
}
