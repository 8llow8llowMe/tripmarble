package com.followfollowme.tripmarble.domainlayer.game.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.RepresentativeRegionInfoInternalResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameCountInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameQueryInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.RepresentativeRegionClientPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameMemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameThemeMappingRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.readmodel.TripGameMemberCount;
import com.followfollowme.tripmarble.domainlayer.game.application.readmodel.TripGameThemeNames;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMember;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.GameStatus;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripGameQueryProcessor {

    private final TripGameRepositoryPort tripGameRepositoryPort;
    private final TripGameMemberRepositoryPort tripGameMemberRepositoryPort;
    private final TripGameThemeMappingRepositoryPort tripGameThemeMappingRepositoryPort;
    private final RepresentativeRegionClientPort representativeRegionClientPort;

    public Slice<TripGameQueryInfo> getMyTripGames(long memberId, long lastTripGameId, int size, GameStatus status) {
        // 1. 내 게임 목록 조회
        Slice<TripGame> gameSlice = tripGameRepositoryPort
            .findMyGameNoOffset(memberId, lastTripGameId, size, status);
        if (gameSlice.isEmpty()) {
            return new SliceImpl<>(List.of(), gameSlice.getPageable(), false);
        }

        List<TripGame> games = gameSlice.getContent();
        List<Long> gameIds = extractGameIds(games);

        // 2. Map 생성
        Map<Long, Long> memberCountMap = getMemberCountMap(gameIds);
        Map<Long, List<String>> themeNamesMap = getThemeNamesMap(gameIds);
        Map<Long, RepresentativeRegionInfoInternalResponse> regionInfoMap = getRegionInfoMap(games);

        // 3. 현재 로그인 사용자의 host/ready 여부
        Map<Long, TripGameMember> myMemberMap = tripGameMemberRepositoryPort.findAllByTripGameIdAndMemberId(gameIds, memberId).stream()
            .collect(Collectors.toMap(TripGameMember::tripGameId, Function.identity()));

        // 3. 최종 조합
        List<TripGameQueryInfo> infos = games.stream()
            .map(game -> {
                TripGameMember myMember = myMemberMap.get(game.id());
                return TripGameQueryInfo.of(
                    game,
                    memberCountMap.getOrDefault(game.id(), 0L),
                    themeNamesMap.getOrDefault(game.id(), List.of()),
                    regionInfoMap.get(game.representativeRegionId()),
                    myMember != null && myMember.isHost(),
                    myMember != null && myMember.isReady()
                );
            })
            .toList();

        return new SliceImpl<>(infos, gameSlice.getPageable(), gameSlice.hasNext());
    }

    public TripGameCountInfo getTripGameCountByMember(long memberId) {
        int tripGameCount = tripGameMemberRepositoryPort.countTripGameByMemberId(memberId);
        return TripGameCountInfo.of(memberId, tripGameCount);
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
