package com.followfollowme.tripmarble.domainlayer.game.application.service;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameCreateResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.command.TripGameCreateCommand;
import com.followfollowme.tripmarble.domainlayer.game.application.port.in.TripGameWebUseCase;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.theme.application.port.out.TripThemeRepositoryPort;
import com.followfollowme.tripmarble.persistence.util.SnowflakeIdGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TripGameFacade implements TripGameWebUseCase {

    private final TripGameRepositoryPort tripGameRepositoryPort;
    private final TripThemeRepositoryPort tripThemeRepositoryPort;
    private final SnowflakeIdGenerator snowflakeIdGenerator;

    @Override
    @Transactional
    public TripGameCreateResponse crateTripGame(TripGameCreateCommand command) {
        TripGame tripGame = TripGame.builder()
            .id(snowflakeIdGenerator.generateId())
            .title(command.title())
            .difficulty(command.difficulty())
            .startedAt(command.startedAt())
            .endedAt(command.endedAt())
            .representativeRegionId(command.representativeRegionId())
            .tripThemeId(command.tripThemeId())
            .build();

        TripGame saved = tripGameRepositoryPort.save(tripGame);

        // TODO: 내부 서비스 통신에 의해 대표 여행지 이름 조회

        // TODO: 여행 테마쪽 조회

        return TripGameCreateResponse.builder()
            .tripGameId(saved.tripThemeId())
            .difficulty(saved.difficulty())
            .startedAt(saved.startedAt())
            .endedAt(saved.endedAt())
            .build();
    }
}
