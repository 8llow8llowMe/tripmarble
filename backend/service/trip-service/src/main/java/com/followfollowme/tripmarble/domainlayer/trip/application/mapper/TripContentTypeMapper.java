package com.followfollowme.tripmarble.domainlayer.trip.application.mapper;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.TripContentTypeEntity;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripContentType;
import java.util.List;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TripContentTypeMapper {

    // 엔티티 -> 도메인
    TripContentType toDomainFromEntity(TripContentTypeEntity entity);

    // 엔티티 리스트 -> 도메인 리스트
    List<TripContentType> toDomainListFromEntityList(
        List<TripContentTypeEntity> entities);
}
