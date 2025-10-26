package com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "대표 여행지 상세 조회 응답 DTO")
public record RepresentativeRegionDetailResponse(

    @Schema(description = "대표 여행지 아이디", example = "1")
    String representativeRegionId,

    @Schema(description = "대표 여행지 이름", example = "서울")
    String representativeRegionName,

    @Schema(description = "대표 여행지 썸네일 이미지 URL", example = "https://cdn.tripmarble.com/seoul.jpg")
    String representativeRegionImageUrl,

    @Schema(description = "대표 여행지 설명", example = "서울은 대한민국의 수도 ~~~")
    String description,

    @Schema(description = "위도", example = "37.5665")
    double latitude,

    @Schema(description = "경도", example = "126.9780")
    double longitude,

    @Schema(
        description = "지도 경계 GeoJSON 데이터 (Polygon/MultiPolygon)",
        example = "{\"type\":\"Polygon\",\"coordinates\":[[[126.97,37.55],[126.99,37.55],[126.99,37.57],[126.97,37.57],[126.97,37.55]]]}"
    )
    String boundaryGeoJson
) {

}
