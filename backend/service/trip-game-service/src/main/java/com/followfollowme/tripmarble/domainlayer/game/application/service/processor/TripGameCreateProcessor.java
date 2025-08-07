package com.followfollowme.tripmarble.domainlayer.game.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.RepresentativeRegionInfoResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.command.TripGameCreateCommand;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameCreateInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.RepresentativeRegionClientPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameMemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameThemeMappingRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMember;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameThemeMapping;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Status;
import com.followfollowme.tripmarble.domainlayer.theme.application.port.out.TripThemeRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.theme.domain.model.TripTheme;
import com.followfollowme.tripmarble.persistence.util.SnowflakeIdGenerator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripGameCreateProcessor {

    private final TripGameRepositoryPort tripGameRepositoryPort;
    private final TripThemeRepositoryPort tripThemeRepositoryPort;
    private final TripGameMemberRepositoryPort tripGameMemberRepositoryPort;
    private final TripGameThemeMappingRepositoryPort tripGameThemeMappingRepositoryPort;
    private final RepresentativeRegionClientPort representativeRegionClientPort;
    private final SnowflakeIdGenerator snowflakeIdGenerator;

    public TripGameCreateInfo createGame(TripGameCreateCommand command) {
        // 1. 선택된 테마 조회
        List<TripTheme> tripThemes = tripThemeRepositoryPort.findByIdIn(command.tripThemeIds());

        // 2. TripGame 생성 및 저장
        TripGame tripGame = TripGame.builder()
            .id(snowflakeIdGenerator.generateId())
            .title(command.title())
            .status(Status.WAITING)
            .difficulty(command.difficulty())
            .startedAt(command.startedAt())
            .endedAt(command.endedAt())
            .representativeRegionId(command.representativeRegionId())
            .currentTurnOrder(1) // 게임 턴은 1부터 시작
            .currentStepNo(0) // 현재 말은 아직 시작점에 들어가기 전
            .build();

        TripGame savedTripGame = tripGameRepositoryPort.save(tripGame);

        // 3. 테마 매핑 저장
        List<TripGameThemeMapping> mappings = command.tripThemeIds().stream()
            .map(themeId -> TripGameThemeMapping.builder()
                .id(snowflakeIdGenerator.generateId())
                .tripGameId(savedTripGame.id())
                .tripThemeId(themeId)
                .build())
            .toList();

        tripGameThemeMappingRepositoryPort.saveAll(mappings, savedTripGame, tripThemes);

        // 4. 방장(자기 자신) 등록
        TripGameMember tripGameMember = TripGameMember.builder()
            .id(snowflakeIdGenerator.generateId())
            .tripGameId(savedTripGame.id())
            .memberId(command.memberId())
            .isReady(true) // 기본적으로 방장은 게임 준비상태로
            .isHost(true)
            .turnOrder(0) // 기본적으로 방장을 0번 순서로 (게임 시작 시, 순서 shuffle 예정)
            .build();

        TripGameMember savedMember = tripGameMemberRepositoryPort.save(tripGameMember, savedTripGame);

        // 5. 대표 지역 정보 조회
        RepresentativeRegionInfoResponse regionInfo = representativeRegionClientPort.getRepresentativeRegionInfo(
            command.representativeRegionId());

        // 결과 DTO 반환
        return TripGameCreateInfo.of(savedTripGame, savedMember, tripThemes, regionInfo);
    }
}
