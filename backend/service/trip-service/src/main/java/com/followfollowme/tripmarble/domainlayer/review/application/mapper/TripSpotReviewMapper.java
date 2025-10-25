package com.followfollowme.tripmarble.domainlayer.review.application.mapper;

import com.followfollowme.tripmarble.domainlayer.review.adapter.out.persistence.entity.TripSpotReviewEntity;
import com.followfollowme.tripmarble.domainlayer.review.domain.model.TripSpotReview;
import com.followfollowme.tripmarble.domainlayer.trip.application.mapper.TripSpotMapper;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = TripSpotMapper.class)
public interface TripSpotReviewMapper {

    // 엔티티 -> 도메인
    @Mapping(target = "tripSpotId", source = "tripSpot.id")
    TripSpotReview toDomainFromEntity(TripSpotReviewEntity entity);

    // 도메인 -> 엔티티
    @Mapping(target = "id", source = "domain.id")
    @Mapping(target = "tripSpot", source = "tripSpot")
    @Mapping(target = "memberId", source = "domain.memberId")
    @Mapping(target = "content", source = "domain.content")
    @Mapping(target = "rating", source = "domain.rating")
    @Mapping(target = "sourceType", source = "domain.sourceType")
    TripSpotReviewEntity toEntityFromDomain(TripSpotReview domain, TripSpot tripSpot);
}
