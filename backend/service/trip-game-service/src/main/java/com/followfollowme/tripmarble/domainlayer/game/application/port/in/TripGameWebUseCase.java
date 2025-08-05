package com.followfollowme.tripmarble.domainlayer.game.application.port.in;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.DifficultyResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameCreateResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameStartResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.command.TripGameCreateCommand;
import java.util.List;

public interface TripGameWebUseCase {

    List<DifficultyResponse> getAllDifficulties();

    TripGameCreateResponse crateTripGame(TripGameCreateCommand command);

    TripGameStartResponse startTripGame(long tripGameId, long hostMemberId);
}
