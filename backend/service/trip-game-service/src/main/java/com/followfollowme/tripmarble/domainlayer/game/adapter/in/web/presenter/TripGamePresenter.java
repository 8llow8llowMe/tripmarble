package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameCreateResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameStartMemberView;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameStartResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameCreateInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameStartInfo;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.theme.domain.model.TripTheme;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TripGamePresenter {

    public TripGameCreateResponse toGameCreateResponseFrom(TripGameCreateInfo createInfo) {
        return TripGameCreateResponse.builder()
            .tripGameId(createInfo.tripGame().id())
            .title(createInfo.tripGame().title())
            .gameStatus(createInfo.tripGame().status().name())
            .gameStatusDescription(createInfo.tripGame().status().getDescription())
            .difficultyCode(createInfo.tripGame().difficulty().name())
            .difficultyDescription(createInfo.tripGame().difficulty().getDescription())
            .startedAt(createInfo.tripGame().startedAt())
            .endedAt(createInfo.tripGame().endedAt())
            .representativeRegionName(createInfo.representativeRegionInfo().representativeRegionName())
            .tripThemeNames(createInfo.tripThemes().stream().map(TripTheme::name).toList())
            .isReady(createInfo.tripGameMember().isReady())
            .isHost(createInfo.tripGameMember().isHost())
            .build();
    }

    public TripGameStartResponse toGameStartResponse(TripGameStartInfo startInfo) {
        TripGame game = startInfo.tripGame();
        List<TripGameStartMemberView> members = startInfo.members().stream()
            .map(m -> TripGameStartMemberView.builder()
                .memberId(m.memberId())
                .nickname(m.nickname())
                .profileImage(m.profileImage())
                .turnOrder(m.turnOrder())
                .isHost(m.isHost())
                .build())
            .toList();

        return TripGameStartResponse.builder()
            .tripGameId(game.id())
            .gameStatusCode(game.status().name())
            .gameStatusDescription(game.status().getDescription())
            .members(members)
            .build();
    }
}
