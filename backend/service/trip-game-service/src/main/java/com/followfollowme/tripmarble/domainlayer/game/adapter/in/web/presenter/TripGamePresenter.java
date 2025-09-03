package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.MyTripGameResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameCreateResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameDetailResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameDiceRollResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameEndResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameMemberView;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameResumeResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameStartResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameCreateInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameDetailInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameDiceResultInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameEndInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameQueryInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameResumeInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameStartInfo;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.theme.domain.model.TripTheme;
import com.followfollowme.tripmarble.persistence.dto.SliceResponse;
import java.util.List;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Component;

@Component
public class TripGamePresenter {

    public TripGameCreateResponse toGameCreateResponse(TripGameCreateInfo createInfo) {
        return TripGameCreateResponse.builder()
            .tripGameId(String.valueOf(createInfo.tripGame().id()))
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

    public SliceResponse<MyTripGameResponse> toMyGameSliceResponse(Slice<TripGameQueryInfo> infoSlice) {
        return SliceResponse.of(infoSlice.map(info -> {
            TripGame game = info.tripGame();
            return MyTripGameResponse.builder()
                .tripGameId(String.valueOf(game.id()))
                .gameStatus(game.status().name())
                .gameStatusDescription(game.status().getDescription())
                .difficultyCode(game.difficulty().name())
                .difficultyDescription(game.difficulty().getDescription())
                .representativeRegionImageUrl(info.representativeRegionInfo().imageUrl())
                .representativeRegionName(info.representativeRegionInfo().representativeRegionName())
                .title(game.title())
                .startedAt(game.startedAt())
                .endedAt(game.endedAt())
                .tripThemeNames(info.tripThemeNames())
                .isHost(info.isHost())
                .isReady(info.isReady())
                .build();
        }));
    }

    public TripGameStartResponse toGameStartResponse(TripGameStartInfo startInfo) {
        return TripGameStartResponse.builder()
            .tripGameId(String.valueOf(startInfo.tripGameId()))
            .gameStatusCode(startInfo.status().name())
            .gameStatusDescription(startInfo.status().getDescription())
            .build();
    }

    public TripGameResumeResponse toResumeResponse(TripGameResumeInfo info) {
        TripGame game = info.tripGame();

        List<TripGameMemberView> memberViews = info.members().stream()
            .map(m -> TripGameMemberView.builder()
                .memberId(String.valueOf(m.memberId()))
                .isHost(m.isHost())
                .turnOrder(m.turnOrder())
                .build()
            ).toList();

        return TripGameResumeResponse.builder()
            .tripGameId(String.valueOf(game.id()))
            .title(game.title())
            .gameStatus(game.status().name())
            .gameStatusDescription(game.status().getDescription())
            .difficultyCode(game.difficulty().name())
            .difficultyDescription(game.difficulty().getDescription())
            .startedAt(game.startedAt())
            .endedAt(game.endedAt())
            .currentTurnOrder(game.currentTurnOrder())
            .currentStepNo(game.currentStepNo())
//            .representativeRegionName(info.representativeRegionInfo().representativeRegionName())
            .tripThemeNames(info.themeNames())
//            .members(memberViews)
            .build();
    }

    public TripGameDiceRollResponse toDiceRollResponse(TripGameDiceResultInfo info) {
        return TripGameDiceRollResponse.builder()
            .tripGameMoveLogId(String.valueOf(info.tripGameMoveLogId()))
            .diceValue(info.diceValue())
            .newStepNo(info.finalStepNo())
            .isGameEnded(info.isGameEnded())
            .landedTileId(String.valueOf(info.landedTile().id()))
            .missionTypeCode(info.landedTile().missionType().name())
            .missionTypeDescription(info.landedTile().missionType().getDescription())
            .build();
    }

    public TripGameEndResponse toEndResponse(TripGameEndInfo info) {
        return TripGameEndResponse.builder()
            .tripGameId(String.valueOf(info.tripGameId()))
            .gameStatusCode(info.status().name())
            .gameStatusDescription(info.status().getDescription())
            .endTypeCode(info.endType().name())
            .endTypeDescription(info.endType().getDescription())
            .build();
    }

    public TripGameDetailResponse toDetailResponse(TripGameDetailInfo info) {
        List<TripGameMemberView> memberViews = info.members().stream()
            .map(m -> TripGameMemberView.builder()
                .memberId(String.valueOf(m.memberId()))
                .nickname(m.nickname())
                .profileImageUrl(m.profileImageUrl())
                .turnOrder(m.turnOrder())
                .isHost(m.isHost())
                .build()
            ).toList();

        return TripGameDetailResponse.builder()
            .tripGameId(String.valueOf(info.tripGameId()))
            .representativeRegionImageUrl(info.representativeRegionInfo().imageUrl())
            .representativeRegionName(info.representativeRegionInfo().representativeRegionName())
            .tripThemeNames(info.tripThemeNames())
            .gameStatusCode(info.status().name())
            .gameStatusDescription(info.status().getDescription())
            .difficultyCode(info.difficulty().name())
            .difficultyDescription(info.difficulty().getDescription())
            .title(info.title())
            .startedAt(info.startedAt())
            .endedAt(info.endedAt())
            .currentTurnOrder(info.currentTurnOrder())
            .currentStepNo(info.currentStepNo())
            .endTypeCode(info.endType() != null ? info.endType().name() : null)
            .endTypeDescription(info.endType() != null ? info.endType().getDescription() : null)
            .members(memberViews)
            .build();
    }
}
