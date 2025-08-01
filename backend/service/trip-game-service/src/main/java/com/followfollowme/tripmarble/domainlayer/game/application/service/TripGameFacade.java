package com.followfollowme.tripmarble.domainlayer.game.application.service;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.DifficultyResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameCreateResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameInfo;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameTileInfo;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.presenter.TripGameCreatePresenter;
import com.followfollowme.tripmarble.domainlayer.game.application.command.TripGameCreateCommand;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameCreateInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameTileCreateInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.port.in.TripGameWebUseCase;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Difficulty;
import com.followfollowme.tripmarble.domainlayer.theme.domain.model.TripTheme;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TripGameFacade implements TripGameWebUseCase {

    private final TripGameCreateProcessor tripGameCreateProcessor;
    private final TripGameTileCreateProcessor tripGameTileCreateProcessor;
    private final TripGameCreatePresenter tripGameCreatePresenter;

    @Override
    public List<DifficultyResponse> getAllDifficulties() {
        return Arrays.stream(Difficulty.values())
            .map(difficulty -> DifficultyResponse.builder()
                .code(difficulty.name())
                .description(difficulty.getDescription())
                .build())
            .toList();
    }

    @Override
    @Transactional
    public TripGameCreateResponse crateTripGame(TripGameCreateCommand command) {
        // 1. 여행 게임(계획) 및 관련 엔티티 생성
        TripGameCreateInfo tripGameCreateInfo = tripGameCreateProcessor.createTripGame(command);

        // 2. 게임 내 블록(말판) 생성
        TripGameTileCreateInfo tripGameTileCreateInfo = tripGameTileCreateProcessor.createTilesForGame(
            tripGameCreateInfo.tripGame(),
            tripGameCreateInfo.tripThemes().stream().map(TripTheme::id).toList(),
            tripGameCreateInfo.tripGame().difficulty()
        );

        // 3. 도메인 객체들을 응답 전용 DTO로 매핑 (TripGameInfo, TripGameTileInfo)
        TripGameInfo gameInfo = tripGameCreatePresenter.toGameInfo(tripGameCreateInfo);
        List<TripGameTileInfo> tileInfos = tripGameCreatePresenter.toTileInfos(tripGameTileCreateInfo);

        // 4. 최종 응답 dto 조립 및 반환
        return tripGameCreatePresenter.toCreateResponseFrom(gameInfo, tileInfos);
    }
}
