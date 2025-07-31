package com.followfollowme.tripmarble.domainlayer.game.application.service;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.DifficultyResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameCreateResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.command.TripGameCreateCommand;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameCreateInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.port.in.TripGameWebUseCase;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Difficulty;
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
        TripGameCreateInfo tripGameCreateInfo = tripGameCreateProcessor.createTripGame(command);

        // TODO: 게임 내 말판 생성 관련 로직 추가
        return null;
    }
}
