package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.MissionResultResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.MyTripGameResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameCreateResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameDiceRollResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameEndResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameResumeResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameStartMemberView;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameStartResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.info.MissionResultInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameCreateInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameDiceResultInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameEndInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameQueryInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameResumeInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameStartInfo;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.theme.domain.model.TripTheme;
import com.followfollowme.tripmarble.persistence.dto.SliceResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
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
        TripGame game = startInfo.tripGame();
        List<TripGameStartMemberView> members = startInfo.members().stream()
            .map(m -> TripGameStartMemberView.builder()
                .memberId(String.valueOf(m.memberId()))
                .nickname(m.nickname())
                .profileImage(m.profileImage())
                .turnOrder(m.turnOrder())
                .isHost(m.isHost())
                .build())
            .toList();

        return TripGameStartResponse.builder()
            .tripGameId(String.valueOf(game.id()))
            .gameStatusCode(game.status().name())
            .gameStatusDescription(game.status().getDescription())
            .members(members)
            .build();
    }

    public TripGameResumeResponse toResumeResponse(TripGameResumeInfo info) {
        TripGame game = info.tripGame();

        List<TripGameStartMemberView> memberViews = info.members().stream()
            .map(m -> TripGameStartMemberView.builder()
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

    public MissionResultResponse toMissionResultResponse(MissionResultInfo info) {
        return MissionResultResponse.builder()
            .tripGameMoveLogId(String.valueOf(info.tripGameMoveLogId()))
            .tripGameTileId(String.valueOf(info.tripGameTileId()))
            .missionResultCode(info.missionResult().name())
            .missionResultDescription(info.missionResult().getDescription())
            .build();
    }
}
