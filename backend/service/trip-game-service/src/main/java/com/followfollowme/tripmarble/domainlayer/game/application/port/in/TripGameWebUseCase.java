package com.followfollowme.tripmarble.domainlayer.game.application.port.in;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.DifficultyResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.MyTripGameCardView;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameCreateResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameStartResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.command.TripGameCreateCommand;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Status;
import com.followfollowme.tripmarble.persistence.dto.SliceResponse;
import java.util.List;

public interface TripGameWebUseCase {

    List<DifficultyResponse> getAllDifficulties();

    TripGameCreateResponse crateTripGame(TripGameCreateCommand command);

    SliceResponse<MyTripGameCardView> getMyTripGames(long memberId, long lastTripGameId, int size, Status status);

    TripGameStartResponse startTripGame(long tripGameId, long hostMemberId);
}
