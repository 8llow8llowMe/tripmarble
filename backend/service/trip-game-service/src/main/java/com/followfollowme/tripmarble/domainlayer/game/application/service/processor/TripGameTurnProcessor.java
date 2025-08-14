package com.followfollowme.tripmarble.domainlayer.game.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameErrorCode;
import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameException;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameMemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameTileRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMember;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripGameTurnProcessor {

    private final TripGameRepositoryPort tripGameRepositoryPort;
    private final TripGameMemberRepositoryPort tripGameMemberRepositoryPort;
    private final TripGameTileRepositoryPort tripGameTileRepositoryPort;

    public void playTurn(long tripGameId, long memberId) {
        // 1. 게임 조회
        TripGame game = tripGameRepositoryPort.findById(tripGameId)
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.GAME_NOT_FOUND));

        // 2. 참여자 목록 조회 및 현재 유저 찾기
        List<TripGameMember> members = tripGameMemberRepositoryPort.findAllByTripGameId(tripGameId);
        TripGameMember me = members.stream()
            .filter(m -> m.memberId() == memberId)
            .findFirst()
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.MEMBER_NOT_FOUND));

        // 3. 현재 턴 확인
        if (game.currentTurnOrder() != me.turnOrder()) {
            throw new TripGameException(TripGameErrorCode.MEMBER_TURN_NOT_MATCH);
        }

        // 4. 주사위 굴리기
        int dice = rollDice();

        // 5. 다음 위치 계산
        int currentStepNo = game.currentStepNo();
        int nextStepNo = currentStepNo + dice;
        int maxStepNo = tripGameTileRepositoryPort.findMaxStepNoByTripGameId(tripGameId);
        boolean isGameFinished = nextStepNo >= maxStepNo;
        int updatedStepNo = Math.min(nextStepNo, maxStepNo);

        // 6. 타일 존재 여부 확인
        tripGameTileRepositoryPort.findByTripGameIdAndStepNo(tripGameId, updatedStepNo)
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.TILE_NOT_FOUND));

        // 7. 게임 상태 업데이트 (위치 + 턴 순서)
        int nextTurnOrder = (game.currentTurnOrder() + 1) % members.size();
        TripGame updatedGame = isGameFinished
            ? game.updateCurrentStepNo(updatedStepNo)
            : game.updateTurnAndStep(updatedStepNo, nextTurnOrder);

        TripGame tripGame = tripGameRepositoryPort.save(updatedGame);

        // 8. TODO: 이동 로그 저장

        // 9. TODO: 웹소켓 전송

        // 10. TODO: 응답 반환
    }

    private int rollDice() {
        return ThreadLocalRandom.current().nextInt(6) + 1;
    }
}
