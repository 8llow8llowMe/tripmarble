package com.followfollowme.tripmarble.domainlayer.game.application.mapper;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.TripGameEntity;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.theme.application.mapper.TripThemeMapper;
import com.followfollowme.tripmarble.domainlayer.theme.domain.model.TripTheme;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = TripThemeMapper.class)
public interface TripGameMapper {

    // 엔티티 -> 도메인
    @Mapping(target = "tripThemeId", source = "tripTheme.id")
    TripGame toDomainFromEntity(TripGameEntity entity);

    // 도메인 -> 엔티티
    @Mapping(target = "id", source = "domain.id")
    @Mapping(target = "title", source = "domain.title")
    @Mapping(target = "status", source = "domain.status")
    @Mapping(target = "difficulty", source = "domain.difficulty")
    @Mapping(target = "startedAt", source = "domain.startedAt")
    @Mapping(target = "endedAt", source = "domain.endedAt")
    @Mapping(target = "representativeRegionId", source = "domain.representativeRegionId")
    @Mapping(target = "tripTheme", source = "tripTheme")
    TripGameEntity toEntityFromDomain(TripGame domain, TripTheme tripTheme);
}
