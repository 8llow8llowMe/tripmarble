package com.followfollowme.tripmarble.domainlayer.game.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameErrorCode;
import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameException;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameResumeInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameMemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameThemeMappingRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameTileRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMember;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameTile;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Status;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripGameResumeProcessor {

    private final TripGameRepositoryPort tripGameRepositoryPort;
    private final TripGameMemberRepositoryPort tripGameMemberRepositoryPort;
    private final TripGameTileRepositoryPort tripGameTileRepositoryPort;
    private final TripGameThemeMappingRepositoryPort tripGameThemeMappingRepositoryPort;

    public TripGameResumeInfo resumeGame(long tripGameId, long memberId) {
        // 1. 게임 조회 + 상태 검증
        TripGame tripGame = tripGameRepositoryPort.findById(tripGameId)
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.GAME_NOT_FOUND));

        if (tripGame.status() == Status.ENDED) {
            throw new TripGameException(TripGameErrorCode.GAME_ALREADY_ENDED);
        }

        // 2. 참가 여부 검증
        boolean isParticipant = tripGameMemberRepositoryPort.existsByTripGameIdAndMemberId(tripGameId, memberId);
        if (!isParticipant) {
            throw new TripGameException(TripGameErrorCode.MEMBER_NOT_PARTICIPANT);
        }

        // 3. 참가자 / 타일 / 테마 정보 조회
        List<TripGameMember> members = tripGameMemberRepositoryPort.findAllByTripGameId(tripGameId);
        List<TripGameTile> tiles = tripGameTileRepositoryPort.findAllByTripGameId(tripGameId);
        List<String> themeNames = tripGameThemeMappingRepositoryPort.findThemeNamesByTripGameId(tripGameId);

        // 4. Info 조합
        return TripGameResumeInfo.of(tripGame, members, tiles, themeNames);
    }
}
