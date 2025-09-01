package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "여행지 상세 정보 조회 응답 DTO")
public record TripSpotWithDetailViewResponse(

    @Schema(description = "여행지 정보 아이디", example = "1")
    String tripSpotId,

    @Schema(description = "여행지 정보 이름 (제목)", example = "가림상회")
    String tripSpotName,

    @Schema(description = "콘텐츠 타입 (관광 타입) 이름", example = "관광지")
    String contentTypeName,

    @Schema(description = "상세 설명", example = "가람 상회는 ~~~~")
    String description,

    @Schema(description = "홈페이지 URL", example = "http://~~~~")
    String homepageUrl,

    @Schema(description = "전화 번호", example = "010-xxxx-xxxx")
    String phoneNumber,

    @Schema(description = "전체 주소", example = "강원특별자치도 삼척시 가곡면 탕곡리")
    String address, // 전체 주소 (addr1)

    @Schema(description = "상세 주소", example = "506-5")
    String addressDetail,

    @Schema(description = "경도", example = "126.8928691464")
    Double longitude,

    @Schema(description = "위도", example = "36.1899003585")
    Double latitude,

    @Schema(description = "여행지 대표 이미지 원본 URL", example = "http://tong.visitkorea.or.kr/~~~.jpg")
    String originalImageUrl
) {
}
