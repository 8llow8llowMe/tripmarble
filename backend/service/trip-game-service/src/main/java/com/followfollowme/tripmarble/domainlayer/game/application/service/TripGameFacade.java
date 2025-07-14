package com.followfollowme.tripmarble.domainlayer.game.application.service;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameCreateResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.command.TripGameCreateCommand;
import com.followfollowme.tripmarble.domainlayer.game.application.port.in.TripGameWebUseCase;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameMemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMember;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Status;
import com.followfollowme.tripmarble.domainlayer.theme.application.port.out.TripThemeRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.theme.domain.model.TripTheme;
import com.followfollowme.tripmarble.persistence.util.SnowflakeIdGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TripGameFacade implements TripGameWebUseCase {

    private final TripGameRepositoryPort tripGameRepositoryPort;
    private final TripThemeRepositoryPort tripThemeRepositoryPort;
    private final TripGameMemberRepositoryPort tripGameMemberRepositoryPort;
    private final SnowflakeIdGenerator snowflakeIdGenerator;

    @Override
    @Transactional
    public TripGameCreateResponse crateTripGame(TripGameCreateCommand command) {
        // 1. 여행 게임(계획) 생성
        TripGame tripGame = TripGame.builder()
            .id(snowflakeIdGenerator.generateId())
            .title(command.title())
            .status(Status.WAITING)
            .difficulty(command.difficulty())
            .startedAt(command.startedAt())
            .endedAt(command.endedAt())
            .representativeRegionId(command.representativeRegionId())
            .tripThemeId(command.tripThemeId())
            .build();

        TripGame savedTripGame = tripGameRepositoryPort.save(tripGame);

        // 2. 방장(자기 자신)을 게임 참여자로 등록
        TripGameMember tripGameMember = TripGameMember.builder()
            .id(snowflakeIdGenerator.generateId())
            .tripGameId(savedTripGame.id())
            .memberId(command.memberId())
            .isReady(false)
            .isHost(true)
            .build();

        TripGameMember savedTripGameMember = tripGameMemberRepositoryPort.save(tripGameMember);

        // 3. 테마 정보 조회
        TripTheme tripTheme = tripThemeRepositoryPort.findById(savedTripGame.tripThemeId())
            .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 여행 테마입니다."));

        // TODO: 내부 서비스 통신에 의해 대표 여행지 이름 조회

        return TripGameCreateResponse.builder()
            .tripGameId(savedTripGame.tripThemeId())
            .status(savedTripGame.status())
            .statusMessage(savedTripGame.status().getDescription())
            .difficulty(savedTripGame.difficulty())
            .difficultyMessage(savedTripGame.difficulty().getDescription())
            .startedAt(savedTripGame.startedAt())
            .endedAt(savedTripGame.endedAt())
            .tripThemeName(tripTheme.name())
            .representativeRegionName(null) // 추후 내부 통신 추가
            .isHost(savedTripGameMember.isHost())
            .isReady(savedTripGameMember.isReady())
            .build();
    }
}
