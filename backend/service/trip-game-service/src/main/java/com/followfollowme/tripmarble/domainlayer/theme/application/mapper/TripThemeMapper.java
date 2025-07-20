package com.followfollowme.tripmarble.domainlayer.theme.application.mapper;

import com.followfollowme.tripmarble.domainlayer.theme.adapter.in.web.dto.TripThemeResponse;
import com.followfollowme.tripmarble.domainlayer.theme.adapter.out.persistence.entity.TripThemeEntity;
import com.followfollowme.tripmarble.domainlayer.theme.domain.model.TripTheme;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TripThemeMapper {

    // 엔티티 -> 도메인
    TripTheme toDomainFromEntity(TripThemeEntity entity);

    // 엔티티 리스트 -> 도메인 리스트
    List<TripTheme> toDomainListFromEntityList(List<TripThemeEntity> entities);

    // 도메인 -> DTO
    @Mapping(target = "tripThemeId", source = "id")
    @Mapping(target = "tripThemeName", source = "name")
    TripThemeResponse toResponseFromDomain(TripTheme domain);

    // 도메인 리스트 -> DTO 리스트
    List<TripThemeResponse> toResponseListFromDomainList(List<TripTheme> domains);
}
