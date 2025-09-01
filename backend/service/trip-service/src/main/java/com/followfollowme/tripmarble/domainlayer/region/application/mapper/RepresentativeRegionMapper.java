package com.followfollowme.tripmarble.domainlayer.region.application.mapper;

import com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.entity.RepresentativeRegionEntity;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.RepresentativeRegion;
import java.util.List;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RepresentativeRegionMapper {

    // 엔티티 -> 도메인
    RepresentativeRegion toDomainFromEntity(RepresentativeRegionEntity entity);

    // 엔티티 리스트 -> 도메인 리스트
    List<RepresentativeRegion> toDomainListFromEntityList(List<RepresentativeRegionEntity> entities);
}
