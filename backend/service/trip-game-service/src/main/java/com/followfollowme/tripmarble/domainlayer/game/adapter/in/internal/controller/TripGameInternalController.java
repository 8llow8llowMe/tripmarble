package com.followfollowme.tripmarble.domainlayer.game.adapter.in.internal.controller;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.internal.dto.TripGameCountInternalResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.port.in.TripGameInternalUseCase;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/internal/v1/trip-games")
@Tag(name = "여행 게임", description = "여행 게임 관련 내부 서비스 통신 전용 API 입니다.")
@Hidden
public class TripGameInternalController {

    private final TripGameInternalUseCase tripGameInternalUseCase;

    @Operation(
        summary = "회원별 여행(게임) 개수 조회",
        description = """
            특정 회원이 참여한 여행 게임(TripGame)의 총 개수를 조회합니다.
            - auth-service 등 외부 서비스에서 회원 프로필 통계(여행 수) 조회 시 사용됩니다.
            - 참여자/방장 구분 없이, 사용자가 속한 모든 게임을 기준으로 계산됩니다.
            """
    )
    @GetMapping("/members/{memberId}/count")
    public ResponseEntity<TripGameCountInternalResponse> getTripGameCountByMember(@PathVariable long memberId) {
        TripGameCountInternalResponse response = tripGameInternalUseCase.getTripGameCountByMember(memberId);
        return ResponseEntity.ok().body(response);
    }
}
