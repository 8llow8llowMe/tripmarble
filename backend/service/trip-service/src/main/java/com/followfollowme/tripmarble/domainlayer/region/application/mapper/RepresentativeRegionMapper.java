package com.followfollowme.tripmarble.domainlayer.region.application.mapper;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionResponse;
import com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.entity.RepresentativeRegionEntity;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.RepresentativeRegion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RepresentativeRegionMapper {

    // 엔티티 -> 도메인
    @Mapping(source = "region.id", target = "regionId")
    @Mapping(source = "sigungu.id", target = "sigunguId")
    RepresentativeRegion toDomainFromEntity(RepresentativeRegionEntity entity);

    // 엔티티 리스트 -> 도메인 리스트
    List<RepresentativeRegion> toDomainListFromEntityList(List<RepresentativeRegionEntity> entities);

    // 도메인 -> DTO
    @Mapping(source = "id", target = "representativeRegionId")
    @Mapping(source = "name", target = "representativeRegionName")
    RepresentativeRegionResponse toResponseFromDomain(RepresentativeRegion domain);

    // 도메인 리스트 -> DTO 리스트
    List<RepresentativeRegionResponse> toResponseListFromDomainList(List<RepresentativeRegion> domains);
}
