package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(hidden = true, description = "내부 서비스 통신 전용 여행지 응답 DTO")
public record TripSpotQueryInternalResponse(

    @Schema(description = "여행지 정보 아이디", example = "1")
    long tripSpotId,

    @Schema(description = "여행 콘텐츠 타입 명칭", example = "관광지")
    String contentTypeName,

    @Schema(description = "여행지 정보 이름 (제목)", example = "가림상회")
    String tripSpotName,

    @Schema(description = "X좌표 (경도)")
    double longitude,

    @Schema(description = "Y좌표 (위도)")
    double latitude
) {

}
