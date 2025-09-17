package com.followfollowme.tripmarble.domainlayer.game.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameErrorCode;
import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameException;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameMoveLogQueryInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameMoveLogRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMoveLog;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripGameMoveLogQueryProcessor {

    private final TripGameRepositoryPort tripGameRepositoryPort;
    private final TripGameMoveLogRepositoryPort tripGameMoveLogRepositoryPort;

    public List<TripGameMoveLogQueryInfo> getMoveLogsByTripGameId(long tripGameId) {
        // 1. 게임 존재 여부 검증
        TripGame tripGame = tripGameRepositoryPort.findById(tripGameId)
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.GAME_NOT_FOUND));

        // 2. 이동 로그 목록 조회
        List<TripGameMoveLog> tripGameMoveLogs = tripGameMoveLogRepositoryPort.findAllByTripGameId(tripGame.id());

        // 3. Info 변환
        return tripGameMoveLogs.stream()
            .map(TripGameMoveLogQueryInfo::of)
            .toList();
    }
}
