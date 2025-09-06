package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.controller;

import com.followfollowme.tripmarble.common.dto.Response;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.MissionResultResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameMoveLogResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.port.in.TripGameMoveLogWebUseCase;
import com.followfollowme.tripmarble.security.common.dto.MemberLoginActive;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/trip-games/{tripGameId}/move-logs")
public class TripGameMoveLogWebController {

    private final TripGameMoveLogWebUseCase tripGameMoveLogWebUseCase;

    @Operation(
        summary = "미션 스킵",
        description = "해당 이동 로그의 미션을 건너뜁니다."
    )
    @PostMapping("/{tripGameMoveLogId}/skip")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Response<MissionResultResponse>> skipMission(
        @PathVariable String tripGameId, @PathVariable String tripGameMoveLogId, @AuthenticationPrincipal MemberLoginActive loginActive) {
        MissionResultResponse response =
            tripGameMoveLogWebUseCase.skipMission(Long.parseLong(tripGameId), Long.parseLong(tripGameMoveLogId), loginActive.id());
        return ResponseEntity.ok().body(Response.success(response));
    }

    @Operation(
        summary = "미션 성공",
        description = "해당 이동 로그의 미션을 성공 처리합니다."
    )
    @PostMapping("/{tripGameMoveLogId}/success")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Response<MissionResultResponse>> successMission(
        @PathVariable String tripGameId, @PathVariable String tripGameMoveLogId, @AuthenticationPrincipal MemberLoginActive loginActive) {
        MissionResultResponse response
            = tripGameMoveLogWebUseCase.successMission(Long.parseLong(tripGameId), Long.parseLong(tripGameMoveLogId), loginActive.id());
        return ResponseEntity.ok().body(Response.success(response));
    }

    @Operation(
        summary = "미션 실패",
        description = "해당 이동 로그의 미션을 실패 처리합니다."
    )
    @PostMapping("/{tripGameMoveLogId}/fail")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Response<MissionResultResponse>> failMission(
        @PathVariable String tripGameId, @PathVariable String tripGameMoveLogId, @AuthenticationPrincipal MemberLoginActive loginActive) {
        MissionResultResponse response
            = tripGameMoveLogWebUseCase.failMission(Long.parseLong(tripGameId), Long.parseLong(tripGameMoveLogId), loginActive.id());
        return ResponseEntity.ok().body(Response.success(response));
    }

    @Operation(
        summary = "게임 이동 로그 목록 조회",
        description = "특정 여행 게임의 이동 로그(타임라인) 전체를 조회합니다."
    )
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Response<List<TripGameMoveLogResponse>>> getMoveLogsByTripGameId(
        @PathVariable String tripGameId, @AuthenticationPrincipal MemberLoginActive loginActive) {
        List<TripGameMoveLogResponse> response = tripGameMoveLogWebUseCase.getMoveLogsByTripGameId(Long.parseLong(tripGameId));
        return ResponseEntity.ok().body(Response.success(response));
    }
}
