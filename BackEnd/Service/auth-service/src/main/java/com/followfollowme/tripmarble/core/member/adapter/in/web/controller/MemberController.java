package com.followfollowme.tripmarble.core.member.adapter.in.web.controller;

import com.followfollowme.tripmarble.common.dto.Response;
import com.followfollowme.tripmarble.core.member.adapter.in.web.dto.MemberMyInfoResponse;
import com.followfollowme.tripmarble.core.member.adapter.in.web.dto.MemberSignupRequest;
import com.followfollowme.tripmarble.core.member.application.command.MemberSignupCommand;
import com.followfollowme.tripmarble.core.member.application.port.in.MemberUseCase;
import com.followfollowme.tripmarble.security.common.dto.MemberLoginActive;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/members")
@Tag(name = "회원", description = "회원 관련 API 입니다.")
public class MemberController {

    private final MemberUseCase memberUseCase;

    @Operation(
        summary = "일반 회원가입",
        description = "해당 서비스에 일반 회원가입 하는 기능입니다."
    )
    @PostMapping("/signup")
    public ResponseEntity<Response<Void>> signup(
        @Valid @RequestBody MemberSignupRequest request) {
        memberUseCase.signup(MemberSignupCommand.from(request));
        return ResponseEntity.ok().body(Response.success());
    }

    @Operation(
        summary = "나의 회원정보 가져오기",
        description = "로그인한 나의 회원정보를 가져오는 기능입니다."
    )
    @GetMapping("/me")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Response<MemberMyInfoResponse>> getMyInfo(
        @AuthenticationPrincipal MemberLoginActive loginActive) {
        MemberMyInfoResponse myInfoResponse = memberUseCase.getMyInfo(loginActive.id());
        return ResponseEntity.ok().body(Response.success(myInfoResponse));
    }
}
