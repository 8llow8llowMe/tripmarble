package com.followfollowme.tripmarble.domainlayer.game.application.port.in;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.DifficultyResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.MyTripGameResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameCreateResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameDetailResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameDiceRollResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameEndResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameRejoinResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameStartResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.command.TripGameCreateCommand;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.GameStatus;
import com.followfollowme.tripmarble.persistence.dto.SliceResponse;

import java.util.List;

public interface TripGameWebUseCase {

    List<DifficultyResponse> getAllDifficulties();

    TripGameCreateResponse crateTripGame(TripGameCreateCommand command);

    SliceResponse<MyTripGameResponse> getMyTripGames(long memberId, long lastTripGameId, int size, GameStatus status);

    TripGameStartResponse startTripGame(long tripGameId, long hostMemberId);

    TripGameDiceRollResponse rollDiceTripGame(long tripGameId, long memberId);

    TripGameEndResponse normalEndTripGame(long tripGameId);

    TripGameEndResponse forceEndTripGame(long tripGameId, long requesterId);

    TripGameDetailResponse getTripGameDetail(long tripGameId);

    TripGameRejoinResponse regionTripGame(long tripGameId, long memberId);
}
