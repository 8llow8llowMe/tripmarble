package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto;

import lombok.Builder;

@Builder
public record TripSpotWithDetailViewResponse(
    long tripSpotId,
<<<<<<< HEAD
    String tripSpotName, // 여행지 이름 (title -> tripSpotName)
    String contentTypeName, // 관광 타입 이름 (contentTypeName)
    String description, // 상세 설명 (overview -> description)
    String homepageUrl, // 홈페이지 URL
    String phoneNumber, // 전화 번호 (tel -> phoneNumber)
    String address, // 전체 주소 (addr1)
    String addressDetail, // 상세 주소 (addr2 -> addressDetail)
    Double longitude, // 경도 (mapX -> longitude)
    Double latitude, // 위도 (mapY -> latitude)
    String imageUrl, // 대표 이미지 원본 (firstImage)
    String thumbnailImageUrl // 대표 이미지 썸네일 (firstImage2)
=======
    String contentTypeName, // TODO: contentTypeId 이용해서 관련 매핑
    String homepageUrl,
    String overview
>>>>>>> 33b8c8c ([BE] fix: rebase 관련 충돌 해결)
) {
}
