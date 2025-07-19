package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Difficulty;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;
import java.util.List;

@Schema(description = "여행 게임 생성 요청 DTO")
public record TripGameCreateRequest(

    @Schema(description = "여행 제목", example = "여름 제주도 여행")
    String title,

    @Schema(description = "게임 난이도", example = "NORMAL")
    Difficulty difficulty,

    @Schema(description = "여행 시작일", example = "2025-07-15")
    LocalDate startedAt,

    @Schema(description = "여행 종료일", example = "2025-07-20")
    LocalDate endedAt,

    @Schema(description = "대표 여행지 아이디", example = "10")
    long representativeRegionId,

    @Schema(description = "여행 테마 아이디 목록", example = "[1, 2, 3, 4]")
    List<Long> tripThemeIds
) {

}
