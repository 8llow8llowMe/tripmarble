package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;

@Builder
@Schema(description = "여행 게임 상세 정보 조회 응답 DTO")
public record TripGameDetailResponse(

    @Schema(description = "여행 게임 ID", example = "1001")
    String tripGameId,

    @Schema(description = "대표 지역 썸네일 이미지 URL", example = "https://.../jeju.jpg")
    String representativeRegionImageUrl,

    @Schema(description = "대표 지역명", example = "제주")
    String representativeRegionName,

    @Schema(description = "여행 테마 이름들", example = "[\"관광\", \"전시\", \"축제/공연\"]")
    List<String> tripThemeNames,

    @Schema(description = "게임 상태 코드", example = "ONGOING")
    String gameStatusCode,

    @Schema(description = "게임 상태 설명", example = "게임 진행 중")
    String gameStatusDescription,

    @Schema(description = "게임 난이도 코드", example = "EASY")
    String difficultyCode,

    @Schema(description = "게임 난이도 설명", example = "보통")
    String difficultyDescription,

    @Schema(description = "여행 게임 제목", example = "여름 제주도 여행")
    String title,

    @Schema(description = "여행 시작일", example = "2025-09-02")
    LocalDate startedAt,

    @Schema(description = "여행 종료일", example = "2025-09-05")
    LocalDate endedAt,

    @Schema(description = "현재 턴 순서", example = "2")
    Integer currentTurnOrder,

    @Schema(description = "현재 말 위치 블록 번호", example = "2")
    Integer currentStepNo,

    @Schema(description = "게임 종료 사유 코드", example = "NORMAL")
    String endTypeCode,

    @Schema(description = "게임 종료 사유 설명", example = "정상 종료")
    String endTypeDescription,

    @Schema(description = "게임 참여자 목록 (순서 및 정보 포함)")
    List<TripGameStartMemberView> members
) {

}
