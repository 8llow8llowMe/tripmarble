package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "여행 콘텐츠 타입 (관광 타입) 목록 조회 응답 DTO")
public record TripContentTypeResponse(

    @Schema(description = "TourAPI 콘텐츠 타입 아이디", example = "12")
    String contentTypeId,

    @Schema(description = "여행 콘텐츠 타입 (관광 타입) 명칭", example = "관광지")
    String contentTypeName
) {

}
