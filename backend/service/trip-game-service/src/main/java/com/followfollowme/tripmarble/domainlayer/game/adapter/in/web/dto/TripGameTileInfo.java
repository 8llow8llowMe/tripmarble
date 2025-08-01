package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "여행 게임 말판 정보 DTO")
public record TripGameTileInfo(
    @Schema(description = "타일 고유 ID", example = "20250731000123")
    long tripGameTileId,

    @Schema(description = "해당 타일이 참조하는 여행지 ID", example = "134512")
    long tripSpotId,

    @Schema(description = "해당 타일의 순서 (1부터 시작)", example = "1")
    int stepNo,

    @Schema(description = "타일 타입", example = "START")
    String tileTypeCode,

    @Schema(description = "타일 타입 설명", example = "출발점")
    String tileTypeDescription,

    @Schema(description = "여행지 이름", example = "제주도민속촌")
    String tripSpotName
) {

}
