package com.followfollowme.tripmarble.domainlayer.game.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameErrorCode;
import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameException;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameEndInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameMemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripGameEndProcessor {

    private final TripGameRepositoryPort tripGameRepositoryPort;
    private final TripGameMemberRepositoryPort tripGameMemberRepositoryPort;

    public TripGameEndInfo forceEndTripGame(long tripGameId, long requesterId) {
        // 1. 게임 조회 및 검증
        TripGame game = tripGameRepositoryPort.findById(tripGameId)
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.GAME_NOT_FOUND));

        // 2. 방장 여부 검증
        tripGameMemberRepositoryPort.findHostMemberInGame(game.id(), requesterId)
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.NOT_HOST_MEMBER));

        // 3. 도메인에 위임하여 강제 종료 처리
        TripGame endedGame = game.forceEnd();

        // 4. 종료 상태 저장
        TripGame updateEndedGame = tripGameRepositoryPort.save(endedGame);

        // 5. 결과 반환
        return TripGameEndInfo.of(updateEndedGame);
    }
}
