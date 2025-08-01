package com.followfollowme.tripmarble.domainlayer.game.application.service;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.TripContentTypeInternalResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.TripSpotRandomResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameTileCreateInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripContentTypeClientPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameTileRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripSpotClientPort;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameTile;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Difficulty;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.TileType;
import com.followfollowme.tripmarble.domainlayer.theme.application.port.out.TripThemeContentTypeMappingRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.theme.domain.model.TripThemeContentTypeMapping;
import com.followfollowme.tripmarble.persistence.util.SnowflakeIdGenerator;
import java.util.List;
import java.util.stream.IntStream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class TripGameTileCreateProcessor {

    private final TripThemeContentTypeMappingRepositoryPort tripThemeContentTypeMappingRepositoryPort;
    private final TripGameTileRepositoryPort tripGameTileRepositoryPort;
    private final TripSpotClientPort tripSpotClientPort;
    private final TripContentTypeClientPort tripContentTypeClientPort;
    private final SnowflakeIdGenerator snowflakeIdGenerator;

    public TripGameTileCreateInfo createTilesForGame(TripGame tripGame, List<Long> tripThemeIds,
        Difficulty difficulty) {
        // 1. 난이도에 따른 말판 개수 결정
        int tileCount = determineTileCount(difficulty);

        // 2. tripTheme -> tripContentTypeId -> contentTypeId 조회 (Tour API 전용 여행 콘텐츠 타입 코드)
        List<TripThemeContentTypeMapping> mappings =
            tripThemeContentTypeMappingRepositoryPort.findByTripThemeIds(tripThemeIds);

        // 2-1. Tour API 전용 여행 콘텐츠 타입 코드로 변환하기 위한 작업 (tripContentTypeId -> contentTypeId)
        List<Long> tripContentTypeIds = mappings.stream()
            .map(TripThemeContentTypeMapping::tripContentTypeId)
            .distinct()
            .toList();

        // 2-2. 내부 서비스 호출을 통해 여행 콘텐츠 타입 목록 조회 (매핑 관련)
        List<TripContentTypeInternalResponse> mappingResponses =
            tripContentTypeClientPort.getTripContentTypes(tripContentTypeIds);

        // TODO: 여행 테마_콘텐츠 타입_매핑 테이블에서 가중치를 이용해서 가중치 고려한 여행지 조회해야함

        // 3. 랜덤 여행지 조회 (내부 서비스 통신)
        List<TripSpotRandomResponse> randomTripSpots = tripSpotClientPort.getRandomTripSpots(
            tripGame.representativeRegionId(),
            mappingResponses.stream().map(TripContentTypeInternalResponse::contentTypeId).toList(),
            tileCount
        );

        // 4. TripGameTile 엔티티 생성
        List<TripGameTile> tripGameTiles = IntStream.range(0, randomTripSpots.size())
            .mapToObj(i -> {
                TripSpotRandomResponse randomResponse = randomTripSpots.get(i);
                return TripGameTile.builder()
                    .id(snowflakeIdGenerator.generateId())
                    .tripGameId(tripGame.id())
                    .tripSpotId(randomResponse.tripSpotId())
                    .stepNo(i + 1)
                    .tileType(determineTileType(i, tileCount))
                    .build();
            })
            .toList();

        // 5. 게임 내 블록들 저장
        List<TripGameTile> saved = tripGameTileRepositoryPort.saveAll(tripGameTiles, tripGame);

        return TripGameTileCreateInfo.of(saved, randomTripSpots);
    }

    private int determineTileCount(Difficulty difficulty) {
        return switch (difficulty) {
            case EASY -> 10;
            case NORMAL -> 20;
            case HARD -> 30;
        };
    }

    private TileType determineTileType(int index, int totalSize) {
        if (index == 0) {
            return TileType.START;
        }
        if (index == totalSize - 1) {
            return TileType.END;
        }
        if (index % 5 == 0) {
            return TileType.MISSION;
        }
        return TileType.NORMAL;
    }
}
