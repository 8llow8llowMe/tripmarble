package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.controller;

import com.followfollowme.tripmarble.common.dto.Response;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.DifficultyResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameCreateRequest;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameCreateResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameStartResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.command.TripGameCreateCommand;
import com.followfollowme.tripmarble.domainlayer.game.application.port.in.TripGameWebUseCase;
import com.followfollowme.tripmarble.security.common.dto.MemberLoginActive;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/trip-games")
@Tag(name = "여행 게임(계획)", description = "여행 게임(계획) 관련 클라이언트 전용 API 입니다.")
public class TripGameWebController {

    private final TripGameWebUseCase tripGameWebUseCase;

    @Operation(
        summary = "여행 게임(계획) 난이도 목록 조회",
        description = "여행 게임(계획) 난이도 목록을 조회하는 기능입니다."
    )
    @GetMapping("/difficulties")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Response<List<DifficultyResponse>>> getAllDifficulties() {
        List<DifficultyResponse> responses = tripGameWebUseCase.getAllDifficulties();
        return ResponseEntity.ok().body(Response.success(responses));
    }

    @Operation(
        summary = "여행 게임(게획) 생성",
        description = "여행 게임(계획)을 생성하는 기능입니다."
    )
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Response<TripGameCreateResponse>> crateTripGame(
        @Valid @RequestBody TripGameCreateRequest request, @AuthenticationPrincipal MemberLoginActive loginActive) {
        TripGameCreateResponse response = tripGameWebUseCase.crateTripGame(
            TripGameCreateCommand.from(request, loginActive.id()));
        return ResponseEntity.ok().body(Response.success(response));
    }

    @Operation(
        summary = "여행 게임 시작",
        description = "게임 방장이 모든 참여자가 준비된 상태에서 게임을 시작하는 기능입니다."
    )
    @PostMapping("/{tripGameId}/start")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Response<TripGameStartResponse>> startTripGame(
        @PathVariable long tripGameId, @AuthenticationPrincipal MemberLoginActive loginActive) {
        TripGameStartResponse response = tripGameWebUseCase.startTripGame(tripGameId, loginActive.id());
        return ResponseEntity.ok().body(Response.success(response));
    }
}
