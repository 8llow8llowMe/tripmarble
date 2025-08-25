package com.followfollowme.tripmarble.domainlayer.game.application.info;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameTile;
import lombok.Builder;

@Builder
public record TripGameDiceResultInfo(
    int diceValue,
    int finalStepNo,
    TripGame updatedGame,
    TripGameTile landedTile,
    boolean isGameEnded
) {

    public static TripGameDiceResultInfo of(int diceValue, int finalStepNo, TripGame game, TripGameTile tile, boolean isGameEnded) {
        return TripGameDiceResultInfo.builder()
            .diceValue(diceValue)
            .finalStepNo(finalStepNo)
            .updatedGame(game)
            .landedTile(tile)
            .isGameEnded(isGameEnded)
            .build();
    }
}
