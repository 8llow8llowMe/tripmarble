package com.followfollowme.tripmarble.domainlayer.region.application.mapper;

import com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.entity.RegionEntity;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.Region;
import java.util.List;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RegionMapper {

    // 엔티티 -> 도메인
    Region toDomainFromEntity(RegionEntity entity);

    // 엔티티 리스트 -> 도메인 리스트
    List<Region> toDomainListFromEntityList(List<RegionEntity> entities);
}
