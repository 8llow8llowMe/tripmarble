package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.controller;

import com.followfollowme.tripmarble.common.dto.Response;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameTileResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.port.in.TripGameTileWebUseCase;
import com.followfollowme.tripmarble.security.common.dto.MemberLoginActive;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/trip-games/{tripGameId}/tiles")
@Tag(name = "여행 게임 블록(타일)", description = "여행 게임 블록(타일) 관련 클라이언트 전용 API 입니다.")
public class TripGameTileWebController {

    private final TripGameTileWebUseCase tripGameTileWebUseCase;

    @Operation(
        summary = "게임 타일 목록 조회",
        description = "특정 여행 게임의 타일(블록) 목록을 조회합니다."
    )
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Response<List<TripGameTileResponse>>> getTilesByTripGameId(@PathVariable long tripGameId,
        @AuthenticationPrincipal MemberLoginActive loginActive) {
        List<TripGameTileResponse> responses = tripGameTileWebUseCase.getTilesByTripGameId(tripGameId, loginActive.id());
        return ResponseEntity.ok().body(Response.success(responses));
    }
}
