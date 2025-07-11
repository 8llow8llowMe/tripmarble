package com.followfollowme.tripmarble.domainlayer.game.application.mapper;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.TripGameEntity;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TripGameMapper {

    // 엔티티 -> 도메인
    TripGame toDomainFromEntity(TripGameEntity entity);

    // 도메인 -> 엔티티
    TripGameEntity toEntityFromDomain(TripGame domain);
}
