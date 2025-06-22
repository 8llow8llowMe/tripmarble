package com.followfollowme.tripmarble.domainlayer.region.application.mapper;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RegionResponse;
import com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.entity.RegionEntity;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.Region;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RegionMapper {

    // 엔티티 리스트 -> 도메인 리스트
    List<Region> toDomainListFromEntityList(List<RegionEntity> entities);

    // 도메인 -> DTO
    @Mapping(source = "id", target = "regionId")
    RegionResponse toResponseFromDomain(Region domain);

    // 도메인 리스트 -> DTO 리스트
    List<RegionResponse> toResponseListFromDomainList(List<Region> domains);
}
