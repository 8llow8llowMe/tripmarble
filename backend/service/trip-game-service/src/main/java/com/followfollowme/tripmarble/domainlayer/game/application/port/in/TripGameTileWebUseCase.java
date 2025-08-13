package com.followfollowme.tripmarble.domainlayer.game.application.port.in;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameTileResponse;
import java.util.List;

public interface TripGameTileWebUseCase {

    List<TripGameTileResponse> getTilesByTripGameId(long tripGameId, long requesterMemberId);
}
