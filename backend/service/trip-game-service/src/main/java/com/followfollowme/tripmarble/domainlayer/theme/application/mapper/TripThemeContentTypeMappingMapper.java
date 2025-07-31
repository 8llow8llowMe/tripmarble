package com.followfollowme.tripmarble.domainlayer.theme.application.mapper;

import com.followfollowme.tripmarble.domainlayer.theme.adapter.out.persistence.entity.TripThemeContentTypeMappingEntity;
import com.followfollowme.tripmarble.domainlayer.theme.domain.model.TripTheme;
import com.followfollowme.tripmarble.domainlayer.theme.domain.model.TripThemeContentTypeMapping;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = TripThemeMapper.class)
public interface TripThemeContentTypeMappingMapper {

    // 엔티티 -> 도메인
    @Mapping(target = "tripThemeId", source = "tripTheme.id")
    TripThemeContentTypeMapping toDomainFromEntity(TripThemeContentTypeMappingEntity entity);

    // 엔티티 리스트 -> 도메인 리스트
    List<TripThemeContentTypeMapping> toDomainListFromEntityList(List<TripThemeContentTypeMappingEntity> entities);

    // 도메인 -> 엔티티
    @Mapping(target = "id", source = "domain.id")
    @Mapping(target = "tripTheme", source = "tripTheme")
    TripThemeContentTypeMappingEntity toEntityFromDomain(TripThemeContentTypeMapping domain, TripTheme tripTheme);
}
