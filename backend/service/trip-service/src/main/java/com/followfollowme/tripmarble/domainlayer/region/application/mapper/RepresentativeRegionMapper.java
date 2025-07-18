package com.followfollowme.tripmarble.domainlayer.region.application.mapper;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionDetailResponse;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionSummaryResponse;
import com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.entity.RepresentativeRegionEntity;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.RepresentativeRegion;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RepresentativeRegionMapper {

    // 엔티티 -> 도메인
    RepresentativeRegion toDomainFromEntity(RepresentativeRegionEntity entity);

    // 엔티티 리스트 -> 도메인 리스트
    List<RepresentativeRegion> toDomainListFromEntityList(List<RepresentativeRegionEntity> entities);

    // 도메인 -> DTO
    @Mapping(source = "id", target = "representativeRegionId")
    @Mapping(source = "name", target = "representativeRegionName")
    RepresentativeRegionSummaryResponse toSummaryResponseFromDomain(RepresentativeRegion domain);

    @Mapping(source = "id", target = "representativeRegionId")
    @Mapping(source = "name", target = "representativeRegionName")
    RepresentativeRegionDetailResponse toDetailResponseFromDomain(RepresentativeRegion domain);

    // 도메인 리스트 -> DTO 리스트
    List<RepresentativeRegionSummaryResponse> toSummaryResponseListFromDomainList(List<RepresentativeRegion> domains);
}
