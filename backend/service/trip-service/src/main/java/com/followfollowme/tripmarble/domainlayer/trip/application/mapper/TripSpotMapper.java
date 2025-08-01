package com.followfollowme.tripmarble.domainlayer.trip.application.mapper;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.TripSpotEntity;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import java.util.List;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TripSpotMapper {

    // 엔티티 -> 도메인
    TripSpot toDomainFromEntity(TripSpotEntity entity);

    // 엔티티 리스트 -> 도메인 리스트
    List<TripSpot> toDomainListFromEntityList(List<TripSpotEntity> entities);
}
