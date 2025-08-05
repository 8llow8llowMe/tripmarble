package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameStartMemberView;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameStartResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameStartInfo;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class TripGameStartPresenter {

    public TripGameStartResponse toStartResponse(TripGameStartInfo gameStartInfo) {
        TripGame tripGame = gameStartInfo.tripGame();

        List<TripGameStartMemberView> members = gameStartInfo.members().stream()
            .map(m -> TripGameStartMemberView.builder()
                .memberId(m.memberId())
                .nickname(m.nickname())
                .profileImage(m.profileImage())
                .turnOrder(m.turnOrder())
                .isHost(m.isHost())
                .build()
            )
            .toList();

        return TripGameStartResponse.builder()
            .tripGameId(tripGame.id())
            .gameStatusCode(tripGame.status().name())
            .gameStatusDescription(tripGame.status().getDescription())
            .members(members)
            .build();
    }
}
