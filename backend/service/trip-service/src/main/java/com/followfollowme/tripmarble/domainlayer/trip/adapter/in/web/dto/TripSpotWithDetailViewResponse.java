package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto;

import lombok.Builder;

@Builder
public record TripSpotWithDetailViewResponse(
    long tripSpotId,
<<<<<<< HEAD
<<<<<<< HEAD
    String contentTypeName, // TODO: contentTypeId 이용해서 관련 매핑
=======
    String contentTypeName,
>>>>>>> e29d80b ([BE] feat: 각 서비스당 Map Struct 적용, Trip Service 관련 개발 (지역, 여행 도메인 관련))
=======
    String contentTypeName, // TODO: contentTypeId 이용해서 관련 매핑
>>>>>>> 7a4c3d8 ([BE] chore: 간격 수정)
    String homepageUrl,
    String overview
) {

}
