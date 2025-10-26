package com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.util.List;

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

    @Schema(description = "지도 경계 GeoJSON 데이터 (Polygon/MultiPolygon)")
    BoundaryGeoJsonItem boundaryGeoJsonItem
) {

    @Builder
    @Schema(description = "GeoJSON 형태의 지도 경계 데이터")
    public record BoundaryGeoJsonItem(
        @Schema(description = "GeoJSON 타입 (Polygon 또는 MultiPolygon)", example = "Polygon")
        String type,

        @Schema(description = "좌표 데이터", example = "[[[127.01,35.82],[127.02,35.83],...]]")
        List<CoordinateGroupItem> coordinates
    ) {

    }

    @Builder
    @Schema(description = "GeoJSON 좌표 그룹 데이터 (다각형 경계)")
    public record CoordinateGroupItem(

        @Schema(description = "단일 다각형을 구성하는 좌표 목록 (위도/경도 쌍)", example = "[[127.01,35.82],[127.02,35.83],...]")
        List<List<Double>> points
    ) {

    }
}
