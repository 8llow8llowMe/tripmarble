package com.followfollowme.tripmarble.domainlayer.game.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameErrorCode;
import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameException;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameRejoinInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameMemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripGameRejoinProcessor {

    private final TripGameRepositoryPort tripGameRepositoryPort;
    private final TripGameMemberRepositoryPort tripGameMemberRepositoryPort;

    public TripGameRejoinInfo rejoinTripGame(long tripGameId, long memberId) {
        // 1. 게임 조회
        TripGame tripGame = tripGameRepositoryPort.findById(tripGameId)
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.GAME_NOT_FOUND));

        // 2. 도메인에 위임하여 상태 검증
        tripGame.resume();

        // 3. 참가 여부 검증
        boolean isParticipant = tripGameMemberRepositoryPort.existsByTripGameIdAndMemberId(tripGameId, memberId);
        if (!isParticipant) {
            throw new TripGameException(TripGameErrorCode.MEMBER_NOT_PARTICIPANT);
        }

        // 4. Info 반환
        return TripGameRejoinInfo.of(tripGame);
    }
}
