package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Difficulty;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import lombok.Builder;

@Builder
@Schema(description = "여행 게임 생성 응답 DTO")
public record TripGameCreateResponse(

    @Schema(description = "생성된 여행 게임 ID", example = "202507110001")
    long tripGameId,

    @Schema(description = "게임 난이도", example = "NORMAL")
    Difficulty difficulty,

    @Schema(description = "여행 시작일", example = "2025-07-15")
    LocalDate startedAt,

    @Schema(description = "여행 종료일", example = "2025-07-20")
    LocalDate endedAt,

    @Schema(description = "대표 여행지 이름", example = "제주도 서귀포시")
    String representativeRegionName,

    @Schema(description = "여행 테마 이름", example = "맛집 투어")
    String tripThemeName

) {

}
