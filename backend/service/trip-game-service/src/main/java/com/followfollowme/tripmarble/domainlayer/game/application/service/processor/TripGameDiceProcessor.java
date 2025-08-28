package com.followfollowme.tripmarble.domainlayer.game.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameErrorCode;
import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameException;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameDiceResultInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameMemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameMoveLogRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameTileRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMember;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMoveLog;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameTile;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.MissionResult;
import com.followfollowme.tripmarble.persistence.util.SnowflakeIdGenerator;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripGameDiceProcessor {

    private final TripGameRepositoryPort tripGameRepositoryPort;
    private final TripGameMemberRepositoryPort tripGameMemberRepositoryPort;
    private final TripGameTileRepositoryPort tripGameTileRepositoryPort;
    private final TripGameMoveLogRepositoryPort tripGameMoveLogRepositoryPort;
    private final SnowflakeIdGenerator snowflakeIdGenerator;

    public TripGameDiceResultInfo rollDiceTripGame(long tripGameId, long memberId) {
        // 1. 게임 조회 및 검증
        TripGame game = tripGameRepositoryPort.findById(tripGameId)
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.GAME_NOT_FOUND));

        // 2. 참여자 조회 및 검증
        TripGameMember me = tripGameMemberRepositoryPort.findByTripGameIdAndMemberId(tripGameId, memberId)
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.MEMBER_NOT_PARTICIPANT));

        // 3. 턴 검증
        if (me.turnOrder() != game.currentTurnOrder()) {
            throw new TripGameException(TripGameErrorCode.MEMBER_TURN_NOT_MATCH);
        }

        // 4. 게임 상태 검증 (진행 가능 여부)
        game.play();

        // 5. 주사위 굴리기 (1~6 랜덤)
        int diceValue = ThreadLocalRandom.current().nextInt(1, 7);

        // 6. 새로운 위치 계산
        List<TripGameTile> tiles = tripGameTileRepositoryPort.findAllByTripGameId(tripGameId);
        int maxStep = tiles.size();
        int newStep = game.currentStepNo() + diceValue;
        boolean isGameEnded = newStep > maxStep;

        // 7. 게임 상태 갱신 (종료 or 진행)
        TripGame updatedGame;
        TripGameTile landedTile = tiles.get(Math.min(newStep, maxStep) - 1);

        if (isGameEnded) {
            updatedGame = game.normalEnd();
        } else {
            int totalMembers = tripGameMemberRepositoryPort.findAllByTripGameId(tripGameId).size();
            int nextTurnOrder = calculateNextTurn(game.currentTurnOrder(), totalMembers);
            updatedGame = game.updateTurnAndStep(newStep, nextTurnOrder);
        }

        tripGameRepositoryPort.save(updatedGame);

        // 8. 이동 로그 기록
        TripGameMoveLog moveLog = TripGameMoveLog.builder()
            .id(snowflakeIdGenerator.generateId())
            .tripGameTileId(landedTile.id())
            .arrivedAt(LocalDateTime.now())
            .dice(diceValue)
            .turnOrder(game.currentTurnOrder()) // 내가 던진 당시 턴
            .missionResult(MissionResult.PENDING)
            .build();
        tripGameMoveLogRepositoryPort.save(moveLog, landedTile);

        // 9. 결과 반환
        return TripGameDiceResultInfo.of(diceValue, newStep, updatedGame, landedTile, isGameEnded);
    }

    // 턴 계산 (솔로는 유지, 멀티는 순환 증가)
    private int calculateNextTurn(int current, int totalMembers) {
        // 솔로 플레이인 경우: 턴은 계속 자기 자신 유지
        if (totalMembers <= 1) {
            return current;
        }
        return (current % totalMembers) + 1; // 멀티플레이 -> 순서 순환
    }
}
