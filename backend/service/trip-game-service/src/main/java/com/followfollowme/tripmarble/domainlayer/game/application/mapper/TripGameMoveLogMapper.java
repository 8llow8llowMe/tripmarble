package com.followfollowme.tripmarble.domainlayer.game.application.mapper;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.TripGameMoveLogEntity;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMoveLog;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameTile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = TripGameTileMapper.class)
public interface TripGameMoveLogMapper {

    // 엔티티 -> 도메인
    @Mapping(target = "tripGameTileId", source = "tripGameTile.id")
    TripGameMoveLog toDomainFromEntity(TripGameMoveLogEntity entity);

    // 도메인 -> 엔티티
    @Mapping(target = "id", source = "domain.id")
    @Mapping(target = "tripGameTile", source = "tripGameTile")
    @Mapping(target = "tripGameTile.tripGame", ignore = true)
    @Mapping(target = "arrivedAt", source = "domain.arrivedAt")
    @Mapping(target = "dice", source = "domain.dice")
    @Mapping(target = "turnOrder", source = "domain.turnOrder")
    @Mapping(target = "missionResult", source = "domain.missionResult")
    TripGameMoveLogEntity toEntityFromDomain(TripGameMoveLog domain, TripGameTile tripGameTile);
}
