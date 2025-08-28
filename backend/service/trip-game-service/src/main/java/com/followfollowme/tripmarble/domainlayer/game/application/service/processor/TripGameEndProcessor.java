package com.followfollowme.tripmarble.domainlayer.game.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameErrorCode;
import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameException;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameEndInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameMemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMember;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripGameEndProcessor {

    private final TripGameRepositoryPort tripGameRepositoryPort;
    private final TripGameMemberRepositoryPort tripGameMemberRepositoryPort;

    public TripGameEndInfo normalEndTripGame(long tripGameId) {
        TripGame game = tripGameRepositoryPort.findById(tripGameId)
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.GAME_NOT_FOUND));

        TripGame endedGame = game.normalEnd();

        tripGameRepositoryPort.save(endedGame);

        return TripGameEndInfo.of(endedGame);
    }


    public TripGameEndInfo forceEndTripGame(long tripGameId, long requesterId) {
        TripGame game = tripGameRepositoryPort.findById(tripGameId)
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.GAME_NOT_FOUND));

        // 방장 여부 검증
        TripGameMember hostMember = tripGameMemberRepositoryPort.findHostMemberInGame(game.id(), requesterId)
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.NOT_HOST_MEMBER));

        // 도메인에 위임 (강제 종료)
        TripGame endedGame = game.forceEnd();

        tripGameRepositoryPort.save(endedGame);

        return TripGameEndInfo.of(endedGame);
    }
}
