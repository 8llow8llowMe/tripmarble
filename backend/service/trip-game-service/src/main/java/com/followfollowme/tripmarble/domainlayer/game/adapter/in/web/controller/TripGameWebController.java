package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.controller;

import com.followfollowme.tripmarble.common.dto.Response;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameCreateRequest;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameCreateResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.command.TripGameCreateCommand;
import com.followfollowme.tripmarble.domainlayer.game.application.port.in.TripGameWebUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/trip-games")
@Tag(name = "여행 게임(계획)", description = "여행 게임(계획) 관련 클라이언트에 제공하는 API 입니다.")
public class TripGameWebController {

    private final TripGameWebUseCase tripGameWebUseCase;

    @Operation(
        summary = "여행 게임(게획) 생성",
        description = "여행 게임(계획)을 생성하는 기능입니다."
    )
    @PostMapping
    public ResponseEntity<Response<TripGameCreateResponse>> crateTripGame(
        @Valid @RequestBody TripGameCreateRequest request) {
        TripGameCreateResponse response = tripGameWebUseCase.crateTripGame(TripGameCreateCommand.from(request));
        return ResponseEntity.ok().body(Response.success(response));
    }
}
