package com.followfollowme.tripmarble.domainlayer.game.application.service;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.DifficultyResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.MyTripGameCardView;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameCreateResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameStartResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.presenter.TripGamePresenter;
import com.followfollowme.tripmarble.domainlayer.game.application.command.TripGameCreateCommand;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameCreateInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameStartInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameTileCreateInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.port.in.TripGameWebUseCase;
import com.followfollowme.tripmarble.domainlayer.game.application.service.processor.TripGameCreateProcessor;
import com.followfollowme.tripmarble.domainlayer.game.application.service.processor.TripGameStartProcessor;
import com.followfollowme.tripmarble.domainlayer.game.application.service.processor.TripGameTileCreateProcessor;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Difficulty;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Status;
import com.followfollowme.tripmarble.domainlayer.theme.domain.model.TripTheme;
import com.followfollowme.tripmarble.persistence.dto.SliceResponse;
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
    private final TripGameStartProcessor tripGameStartProcessor;
    private final TripGamePresenter tripGamePresenter;

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
        TripGameCreateInfo tripGameCreateInfo = tripGameCreateProcessor.createGame(command);

        // 2. 게임 내 블록(말판) 생성
        TripGameTileCreateInfo tripGameTileCreateInfo = tripGameTileCreateProcessor.createTilesForGame(
            tripGameCreateInfo.tripGame(),
            tripGameCreateInfo.tripThemes().stream().map(TripTheme::id).toList(),
            tripGameCreateInfo.tripGame().difficulty()
        );

        // 3. 응답용 DTO로 변환
        return tripGamePresenter.toGameCreateResponseFrom(tripGameCreateInfo);
    }

    @Override
    @Transactional(readOnly = true)
    public SliceResponse<MyTripGameCardView> getMyTripGames(long memberId, long lastTripGameId, int size, Status status) {

        return null;
    }

    @Override
    @Transactional
    public TripGameStartResponse startTripGame(long tripGameId, long hostMemberId) {
        // 1. 게임 시작 처리 (게임 상태 변경 + 턴 순서 지정 + 멤버 정보 포함)
        TripGameStartInfo tripGameStartInfo = tripGameStartProcessor.startGame(tripGameId, hostMemberId);

        // 2. 응답용 DTO로 변환
        return tripGamePresenter.toGameStartResponse(tripGameStartInfo);
    }
}
