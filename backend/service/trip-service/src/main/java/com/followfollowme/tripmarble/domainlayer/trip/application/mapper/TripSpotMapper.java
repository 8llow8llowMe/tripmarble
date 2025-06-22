package com.followfollowme.tripmarble.domainlayer.trip.application.mapper;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotSimpleResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.TripSpotEntity;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TripSpotMapper {

    // 엔티티 -> 도메인
    TripSpot toDomainFromEntity(TripSpotEntity entity);

    // 엔티티 리스트 -> 도메인 리스트
    List<TripSpot> toDomainListFromEntityList(List<TripSpotEntity> entities);

    // 도메인 -> Simple Response DTO
    @Mapping(source = "id", target = "tripSpotId")
    @Mapping(source = "firstImage2", target = "thumbnailImage")
    TripSpotSimpleResponse toSimpleResponseFromDomain(TripSpot domain);

    // 도메인 리스트 -> Simple Respons DTO 리스트
    List<TripSpotSimpleResponse> toSimpleResponseListFromDomainList(List<TripSpot> domains);
}
