package com.followfollowme.tripmarble.domainlayer.review.application.mapper;

import com.followfollowme.tripmarble.domainlayer.review.adapter.out.persistence.entity.TripSpotReviewPhotoEntity;
import com.followfollowme.tripmarble.domainlayer.review.domain.model.TripSpotReview;
import com.followfollowme.tripmarble.domainlayer.review.domain.model.TripSpotReviewPhoto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = TripSpotReviewMapper.class)
public interface TripSpotReviewPhotoMapper {

    // 엔티티 -> 도메인
    @Mapping(target = "tripSpotReviewId", source = "tripSpotReview.id")
    TripSpotReviewPhoto toDomainFromEntity(TripSpotReviewPhotoEntity entity);

    // 엔티티 리스트 -> 도메인 리스트
    List<TripSpotReviewPhoto> toDomainListFromEntityList(List<TripSpotReviewPhotoEntity> entities);

    // 도메인 -> 엔티티
    @Mapping(target = "id", source = "domain.id")
    @Mapping(target = "tripSpotReview", source = "tripSpotReview")
    @Mapping(target = "tripSpotReview.tripSpot", ignore = true) // 순환참조 방지
    @Mapping(target = "photoUrl", source = "domain.photoUrl")
    TripSpotReviewPhotoEntity toEntityFromDomain(TripSpotReviewPhoto domain, TripSpotReview tripSpotReview);

    // 도메인 리스트 -> 엔티티 리스트
    default List<TripSpotReviewPhotoEntity> toEntityListFromDommainList(List<TripSpotReviewPhoto> domains, TripSpotReview tripSpotReview) {
        return domains.stream()
            .map(domain -> toEntityFromDomain(domain, tripSpotReview))
            .toList();
    }
}
