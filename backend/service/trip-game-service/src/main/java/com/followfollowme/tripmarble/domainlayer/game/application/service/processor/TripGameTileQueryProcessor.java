package com.followfollowme.tripmarble.domainlayer.game.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.TripSpotQueryInternalResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameErrorCode;
import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameException;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameTileQueryInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameMemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameTileRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripSpotClientPort;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameTile;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripGameTileQueryProcessor {

    private final TripGameRepositoryPort tripGameRepositoryPort;
    private final TripGameMemberRepositoryPort tripGameMemberRepositoryPort;
    private final TripGameTileRepositoryPort tripGameTileRepositoryPort;
    private final TripSpotClientPort tripSpotClientPort;

    public TripGameTileQueryInfo getTilesByTripGameId(long tripGameId, long requesterMemberId) {
        // 1. 게임 존재 검증
        TripGame tripGame = tripGameRepositoryPort.findById(tripGameId)
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.GAME_NOT_FOUND));

        // 2. 게임 참여자인지 검증
        boolean isParticipant = tripGameMemberRepositoryPort.existsByTripGameIdAndMemberId(tripGameId, requesterMemberId);
        if (!isParticipant) {
            throw new TripGameException(TripGameErrorCode.MEMBER_NOT_PARTICIPANT);
        }

        // 3. 블록(타일) 목록 조회
        List<TripGameTile> tripGameTiles = tripGameTileRepositoryPort.findAllByTripGameId(tripGameId);

        // 4. 여행지 정보 배치 조회
        List<Long> tripSpotIds = tripGameTiles.stream()
            .map(TripGameTile::tripSpotId)
            .distinct()
            .toList();

        List<TripSpotQueryInternalResponse> tripSpotInfos = tripSpotClientPort.getTripSpotsByIds(tripSpotIds);

        // 5. Info로 반환
        return TripGameTileQueryInfo.of(tripGameTiles, tripSpotInfos);
    }
}
