package com.followfollowme.tripmarble.domainlayer.game.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.game.application.port.out.RepresentativeRegionClientPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameMemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameThemeMappingRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.readmodel.TripGameMemberCount;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Status;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripGameMyListQueryProcessor {

    private final TripGameRepositoryPort tripGameRepositoryPort;
    private final TripGameMemberRepositoryPort tripGameMemberRepositoryPort;
    private final TripGameThemeMappingRepositoryPort tripGameThemeMappingRepositoryPort;
    private final RepresentativeRegionClientPort representativeRegionClientPort;

    public void getMyGaems(long memberId, long lastTripGameId, int size, Status status) {
        // 1. 내 게임 목록 조회
        Slice<TripGame> gameSlice = tripGameRepositoryPort.findMyGameNoOffset(memberId, lastTripGameId, size, status);

        if (gameSlice.isEmpty()) {

        }

        List<TripGame> games = gameSlice.getContent();
        List<Long> gameIds = games.stream().map(TripGame::id).toList();

        // 2. 멤버 수 집계
        List<TripGameMemberCount> tripGameMemberCounts = tripGameMemberRepositoryPort.countByTripGameIds(gameIds);
    }
}
