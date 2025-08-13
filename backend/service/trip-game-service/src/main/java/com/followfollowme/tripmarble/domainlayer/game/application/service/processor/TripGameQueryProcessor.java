package com.followfollowme.tripmarble.domainlayer.game.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.RepresentativeRegionInfoInternalResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameQueryInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.RepresentativeRegionClientPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameMemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameThemeMappingRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.readmodel.TripGameMemberCount;
import com.followfollowme.tripmarble.domainlayer.game.application.readmodel.TripGameThemeNames;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Status;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripGameQueryProcessor {

    private final TripGameRepositoryPort tripGameRepositoryPort;
    private final TripGameMemberRepositoryPort tripGameMemberRepositoryPort;
    private final TripGameThemeMappingRepositoryPort tripGameThemeMappingRepositoryPort;
    private final RepresentativeRegionClientPort representativeRegionClientPort;

    public List<TripGameQueryInfo> getMyTripGames(long memberId, long lastTripGameId, int size, Status status) {
        // 1. 내 게임 목록 조회
        Slice<TripGame> gameSlice = tripGameRepositoryPort
            .findMyGameNoOffset(memberId, lastTripGameId, size, status);
        if (gameSlice.isEmpty()) {
            return List.of();
        }

        List<TripGame> games = gameSlice.getContent();
        List<Long> gameIds = extractGameIds(games);

        // 2. Map 생성
        Map<Long, Long> memberCountMap = getMemberCountMap(gameIds);
        Map<Long, List<String>> themeNamesMap = getThemeNamesMap(gameIds);
        Map<Long, RepresentativeRegionInfoInternalResponse> regionInfoMap = getRegionInfoMap(games);

        // 3. 최종 조합
        return games.stream()
            .map(game -> TripGameQueryInfo.of(
                game,
                memberCountMap.get(game.id()),
                themeNamesMap.get(game.id()),
                regionInfoMap.get(game.representativeRegionId())
            ))
            .toList();
    }

    private List<Long> extractGameIds(List<TripGame> games) {
        return games.stream()
            .map(TripGame::id)
            .toList();
    }

    private Map<Long, Long> getMemberCountMap(List<Long> gameIds) {
        return tripGameMemberRepositoryPort
            .countByTripGameIds(gameIds).stream()
            .collect(Collectors.toMap(
                TripGameMemberCount::tripGameId,
                TripGameMemberCount::memberCount
            ));
    }

    private Map<Long, List<String>> getThemeNamesMap(List<Long> gameIds) {
        return tripGameThemeMappingRepositoryPort
            .findThemeNamesByTripGameIds(gameIds).stream()
            .collect(Collectors.groupingBy(
                TripGameThemeNames::tripGameId,
                Collectors.mapping(TripGameThemeNames::themeName, Collectors.toList())
            ));
    }

    private Map<Long, RepresentativeRegionInfoInternalResponse> getRegionInfoMap(List<TripGame> games) {
        List<Long> representativeRegionIds = games.stream()
            .map(TripGame::representativeRegionId)
            .distinct()
            .toList();

        return representativeRegionClientPort
            .getRepresentativeRegionsByIds(representativeRegionIds).stream()
            .collect(Collectors.toMap(
                RepresentativeRegionInfoInternalResponse::representativeRegionId,
                Function.identity()
            ));
    }
}
