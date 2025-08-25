package com.followfollowme.tripmarble.domainlayer.game.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameErrorCode;
import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameException;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameDiceResultInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameMemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameTileRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMember;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameTile;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
public class TripGameDiceProcessor {

    private final TripGameRepositoryPort tripGameRepositoryPort;
    private final TripGameMemberRepositoryPort tripGameMemberRepositoryPort;
    private final TripGameTileRepositoryPort tripGameTileRepositoryPort;

    public TripGameDiceResultInfo rollDiceTripGame(long tripGameId, long memberId) {
        // 1. 게임 검증
        TripGame game = tripGameRepositoryPort.findById(tripGameId)
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.GAME_NOT_FOUND));

        // 1-1. 게임 상태별로 검증 (상태별로 자기 책임으로 검증)
        game.status().validatePlayable();

        // 2, 턴 검증
        TripGameMember me = tripGameMemberRepositoryPort.findByTripGameIdAndMemberId(tripGameId, memberId)
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.MEMBER_NOT_PARTICIPANT));

        if (me.turnOrder() != game.currentTurnOrder()) {
            throw new TripGameException(TripGameErrorCode.MEMBER_TURN_NOT_MATCH);
        }

        // 3. 주사위 값 생성
        int diceValue = ThreadLocalRandom.current().nextInt(1, 7);

        // 4. 새로운 위치 계산
        List<TripGameTile> tiles = tripGameTileRepositoryPort.findAllByTripGameId(tripGameId);
        int maxStep = tiles.size();
        int newStep = game.currentStepNo() + diceValue;

        boolean isGameEnded = false;
        if (newStep > maxStep) {
            isGameEnded = true;

            // 게임 종료 처리
            TripGame endedGame = game.end();
            tripGameRepositoryPort.save(endedGame);

            TripGameTile landedTile = tiles.get(maxStep - 1);

            return TripGameDiceResultInfo.of(diceValue, newStep, endedGame, landedTile, isGameEnded);
        }

        // 5. 턴 순서 변경 (솔로 vs 멀티)
        int totalMembers = tripGameMemberRepositoryPort.findAllByTripGameId(tripGameId).size();
        int nextTurnOrder = calculateNextTurn(game.currentTurnOrder(), totalMembers);

        TripGame updated = game.updateTurnAndStep(newStep, nextTurnOrder);
        tripGameRepositoryPort.save(updated);

        // 6. 결과 반환
        TripGameTile landedTile = tiles.get(newStep - 1);
        return TripGameDiceResultInfo.of(diceValue, newStep, updated, landedTile, isGameEnded);
    }

    private int calculateNextTurn(int current, int totalMembers) {
        // 솔로 플레이인 경우: 턴은 계속 자기 자신 유지
        if (totalMembers <= 1) {
            return current;
        }
        return (current % totalMembers) + 1;
    }
}
