package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "여행 게임 타일(블록) 단건 응답 DTO")
public record TripGameTileResponse(

    @Schema(description = "타일(블록) 고유 ID", example = "20250731000123")
    long tripGameTileId,

    @Schema(description = "해당 타일이 참조하는 여행지 ID", example = "134512")
    long tripSpotId,

    @Schema(description = "여행지 이름", example = "제주도민속촌")
    String tripSpotName,

    @Schema(description = "해당 타일의 순서 (1부터 시작)", example = "1")
    int stepNo,

    @Schema(description = "미션 타입", example = "PHOTO")
    String missionTypeCode,

    @Schema(description = "미션 타입 설명", example = "사진 인증")
    String missionTypeDescription
) {

}
