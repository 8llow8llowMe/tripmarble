package com.followfollowme.tripmarble.domainlayer.trip.application.mapper;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripSpotRandomResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotSimpleResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotWithDetailViewResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.TripSpotEntity;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpotDetail;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TripSpotMapper {

    // 엔티티 -> 도메인
    TripSpot toDomainFromEntity(TripSpotEntity entity);

    // 엔티티 리스트 -> 도메인 리스트
    List<TripSpot> toDomainListFromEntityList(List<TripSpotEntity> entities);

    // 도메인 -> Simple Response DTO
    @Mapping(source = "id", target = "tripSpotId")
    @Mapping(source = "title", target = "tripSpotName")
    @Mapping(source = "firstImage", target = "originalImageUrl")
    TripSpotSimpleResponse toSimpleResponseFromDomain(TripSpot domain);

    default TripSpotWithDetailViewResponse toDetailViewResponseFrom(
        TripSpot tripSpot, String contentTypeName, TripSpotDetail tripSpotDetail) {

        return TripSpotWithDetailViewResponse.builder()
            .tripSpotId(tripSpot.id())
            .tripSpotName(tripSpot.title())
            .contentTypeName(contentTypeName)
            .description(tripSpotDetail.overview())
            .homepageUrl(tripSpotDetail.homepage())
            .phoneNumber(tripSpot.tel())
            .address(tripSpot.addr1())
            .addressDetail(tripSpot.addr2())
            .longitude(tripSpot.mapX())
            .latitude(tripSpot.mapY())
            .originalImageUrl(tripSpot.firstImage())
            .build();
    }

    // 내부 서비스 통신용
    // 도메인 -> Random Response DTO
    @Mapping(source = "id", target = "tripSpotId")
    @Mapping(source = "title", target = "tripSpotName")
    TripSpotRandomResponse toRandomResponseFromDomain(TripSpot domain);

    // 도메인 리스트 -> Random Response DTO 리스트
    List<TripSpotRandomResponse> toRandomResponseListFromDomainList(List<TripSpot> domains);
}
