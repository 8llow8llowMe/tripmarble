package com.followfollowme.tripmarble.domainlayer.game.application.mapper;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.TripGameMoveLogEntity;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMember;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMoveLog;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameTile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {TripGameTileMapper.class, TripGameMemberMapper.class})
public interface TripGameMoveLogMapper {

    // 엔티티 -> 도메인
    @Mapping(target = "tripGameTileId", source = "tripGameTile.id")
    @Mapping(target = "tripGameMemberId", source = "tripGameMember.id")
    TripGameMoveLog toDomainFromEntity(TripGameMoveLogEntity entity);

    // 도메인 -> 엔티티
    @Mapping(target = "id", source = "domain.id")
    @Mapping(target = "tripGameTile", source = "tripGameTile")
    @Mapping(target = "tripGameMember", source = "tripGameMember")
    @Mapping(target = "tripGameTile.tripGame", ignore = true) // 순환참조 방지
    @Mapping(target = "tripGameMember.tripGame", ignore = true) // 순환참조 방지
    @Mapping(target = "arrivedAt", source = "domain.arrivedAt")
    @Mapping(target = "dice", source = "domain.dice")
    @Mapping(target = "turnOrder", source = "domain.turnOrder")
    @Mapping(target = "missionResult", source = "domain.missionResult")
    TripGameMoveLogEntity toEntityFromDomain(TripGameMoveLog domain, TripGameTile tripGameTile, TripGameMember tripGameMember);
}
