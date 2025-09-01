package com.followfollowme.tripmarble.domainlayer.game.application.mapper;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.TripGameThemeMappingEntity;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameThemeMapping;
import com.followfollowme.tripmarble.domainlayer.theme.application.mapper.TripThemeMapper;
import com.followfollowme.tripmarble.domainlayer.theme.domain.model.TripTheme;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {TripGameMapper.class, TripThemeMapper.class})
public interface TripGameThemeMappingMapper {

    // 엔티티 -> 도메인
    @Mapping(target = "tripGameId", source = "tripGame.id")
    @Mapping(target = "tripThemeId", source = "tripTheme.id")
    TripGameThemeMapping toDomainFromEntity(TripGameThemeMappingEntity entity);

    // 엔티티 리스트 -> 도메인 리스트
    List<TripGameThemeMapping> toDomainListFromEntityList(List<TripGameThemeMappingEntity> entities);

    // 도메인 -> 엔티티
    @Mapping(target = "id", source = "domain.id")
    @Mapping(target = "tripGame", source = "tripGame")
    @Mapping(target = "tripTheme", source = "tripTheme")
    TripGameThemeMappingEntity toEntityFromDomain(TripGameThemeMapping domain, TripGame tripGame, TripTheme tripTheme);

    // 도메인 리스트 -> 엔티티 리스트
    default List<TripGameThemeMappingEntity> toEntityListFromDomainList(
        List<TripGameThemeMapping> domains, TripGame tripGame, List<TripTheme> tripThemes
    ) {
        Map<Long, TripTheme> themeMap = tripThemes.stream()
            .collect(Collectors.toMap(TripTheme::id, Function.identity()));

        return domains.stream()
            .map(domain -> {
                TripTheme tripTheme = themeMap.get(domain.tripThemeId());
                return toEntityFromDomain(domain, tripGame, tripTheme);
            })
            .toList();
    }
}
