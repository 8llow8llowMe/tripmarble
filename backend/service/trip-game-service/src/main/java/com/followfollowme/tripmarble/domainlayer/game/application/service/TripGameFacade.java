package com.followfollowme.tripmarble.domainlayer.game.application.service;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameCreateResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.RepresentativeRegionInfoResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.command.TripGameCreateCommand;
import com.followfollowme.tripmarble.domainlayer.game.application.port.in.TripGameWebUseCase;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.RepresentativeRegionClientPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameMemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMember;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Status;
import com.followfollowme.tripmarble.domainlayer.theme.application.exception.TripThemeErrorCode;
import com.followfollowme.tripmarble.domainlayer.theme.application.exception.TripThemeException;
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
    private final RepresentativeRegionClientPort representativeRegionClientPort;


    @Override
    @Transactional
    public TripGameCreateResponse crateTripGame(TripGameCreateCommand command) {
        // 1. 여행 테마 조회
        TripTheme tripTheme = tripThemeRepositoryPort.findById(command.tripThemeId())
            .orElseThrow(() -> new TripThemeException(TripThemeErrorCode.TRIP_THEME_NOT_FOUND));

        // 1. 여행 게임(계획) 도메인 생성
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

        // 3. 여행 게임 (계획) 저장 (tripTheme도 같이 전달)
        TripGame savedTripGame = tripGameRepositoryPort.save(tripGame, tripTheme);

        // 4. 방장(자기 자신)을 게임 참여자로 등록
        TripGameMember tripGameMember = TripGameMember.builder()
            .id(snowflakeIdGenerator.generateId())
            .tripGameId(savedTripGame.id())
            .memberId(command.memberId())
            .isReady(false)
            .isHost(true)
            .build();

        TripGameMember savedTripGameMember = tripGameMemberRepositoryPort.save(tripGameMember);

        // 5. 내부 서비스 통신에 의해 대표 여행지 이름 조회
        RepresentativeRegionInfoResponse representativeRegionInfoResponse =
            representativeRegionClientPort.getRepresentativeRegionInfo(command.representativeRegionId());

        return TripGameCreateResponse.builder()
            .tripGameId(savedTripGame.tripThemeId())
            .status(savedTripGame.status())
            .statusMessage(savedTripGame.status().getDescription())
            .difficulty(savedTripGame.difficulty())
            .difficultyMessage(savedTripGame.difficulty().getDescription())
            .startedAt(savedTripGame.startedAt())
            .endedAt(savedTripGame.endedAt())
            .tripThemeName(tripTheme.name())
            .representativeRegionName(representativeRegionInfoResponse.representativeRegionName())
            .isHost(savedTripGameMember.isHost())
            .isReady(savedTripGameMember.isReady())
            .build();
    }
}
