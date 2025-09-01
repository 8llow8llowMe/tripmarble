package com.followfollowme.tripmarble.domainlayer.game.application.mapper;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.TripGameTileEntity;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameTile;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TripGameTileMapper {

    // 엔티티 -> 도메인
    @Mapping(target = "tripGameId", source = "tripGame.id")
    TripGameTile toDomainFromEntity(TripGameTileEntity entity);

    // 엔티티 리스트 -> 도메인 리스트
    List<TripGameTile> toDomainListFromEntityList(List<TripGameTileEntity> entities);

    // 도메인 -> 엔티티
    @Mapping(target = "id", source = "domain.id")
    @Mapping(target = "tripGame", source = "tripGame")
    TripGameTileEntity toEntityFromDomain(TripGameTile domain, TripGame tripGame);

    // 도메인 리스트 -> 엔티티 리스트
    default List<TripGameTileEntity> toEntityListFromDomainList(List<TripGameTile> domains, TripGame tripGame) {
        return domains.stream()
            .map(domain -> toEntityFromDomain(domain, tripGame))
            .toList();
    }
}
