package com.followfollowme.tripmarble.domainlayer.region.application.mapper;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionResponse;
import com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.entity.RepresentativeRegionEntity;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.RepresentativeRegion;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RepresentativeRegionMapper {

    // 엔티티 리스트 -> 도메인 리스트
    List<RepresentativeRegion> toDomainListFromEntityList(List<RepresentativeRegionEntity> entities);

    // 도메인 리스트 -> DTO 리스트
    List<RepresentativeRegionResponse> toResponseListFromDomainList(List<RepresentativeRegion> domains);

    // 엔티티 -> 도메인
    RepresentativeRegion toDomainFromEntity(RepresentativeRegionEntity entity);
}
