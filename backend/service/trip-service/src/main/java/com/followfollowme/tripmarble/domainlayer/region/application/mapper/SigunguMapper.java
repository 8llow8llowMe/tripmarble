package com.followfollowme.tripmarble.domainlayer.region.application.mapper;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.SigunguResponse;
import com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.entity.SigunguEntity;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.Sigungu;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SigunguMapper {

    // 엔티티 리스트 -> 도메인 리스트
    List<Sigungu> toDomainListFromEntityList(List<SigunguEntity> entities);

    // 도메인 -> DTO
    @Mapping(source = "id", target = "sigunguId")
    SigunguResponse toResponseFromDomain(Sigungu domain);

    // 도메인 리스트 -> DTO 리스트
    List<SigunguResponse> toResponseListFromDomainList(List<Sigungu> domains);
}
