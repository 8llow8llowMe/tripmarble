package com.followfollowme.tripmarble.core.member.adapter.in.web.controller;

import com.followfollowme.tripmarble.common.dto.Response;
import com.followfollowme.tripmarble.core.member.adapter.in.web.dto.MemberMyInfoResponse;
import com.followfollowme.tripmarble.core.member.adapter.in.web.dto.MemberSignupRequest;
import com.followfollowme.tripmarble.core.member.application.command.MemberSignupCommand;
import com.followfollowme.tripmarble.core.member.application.port.in.MemberUseCase;
import com.followfollowme.tripmarble.security.common.dto.MemberLoginActive;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/members")
public class MemberController {

    private final MemberUseCase memberUseCase;

    @PostMapping("/signup")
    public ResponseEntity<Response<Void>> signupMember(@Valid @RequestBody MemberSignupRequest request) {
        memberUseCase.signupMember(MemberSignupCommand.from(request));
        return ResponseEntity.ok().body(Response.success());
    }

    @GetMapping("/me")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Response<MemberMyInfoResponse>> getMyInfoMember(@AuthenticationPrincipal MemberLoginActive loginActive) {
        MemberMyInfoResponse myInfoResponse = memberUseCase.getMyInfoMember(loginActive.id());
        return ResponseEntity.ok().body(Response.success(myInfoResponse));
    }
}
