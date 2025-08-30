package com.followfollowme.tripmarble.domainlayer.game.application.info;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMoveLog;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameTile;
import lombok.Builder;

@Builder
public record TripGameDiceResultInfo(
    long tripGameMoveLogId,
    int diceValue,
    int finalStepNo,
    TripGame updatedGame,
    TripGameTile landedTile,
    boolean isGameEnded
) {

    public static TripGameDiceResultInfo of(
        TripGameMoveLog tripGameMoveLog, int diceValue, int finalStepNo, TripGame game, TripGameTile tile, boolean isGameEnded) {
        return TripGameDiceResultInfo.builder()
            .tripGameMoveLogId(tripGameMoveLog.id())
            .diceValue(diceValue)
            .finalStepNo(finalStepNo)
            .updatedGame(game)
            .landedTile(tile)
            .isGameEnded(isGameEnded)
            .build();
    }
}
