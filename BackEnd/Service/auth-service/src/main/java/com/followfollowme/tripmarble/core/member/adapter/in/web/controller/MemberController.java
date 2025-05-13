package com.followfollowme.tripmarble.core.member.adapter.in.web.controller;

import com.followfollowme.tripmarble.common.dto.Response;
import com.followfollowme.tripmarble.core.member.adapter.in.web.dto.MemberSignupRequest;
import com.followfollowme.tripmarble.core.member.application.command.MemberSignupCommand;
import com.followfollowme.tripmarble.core.member.application.port.in.MemberUseCase;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/members")
public class MemberController {

    private final MemberUseCase memberUseCase;

    @PostMapping("/signup")
    public ResponseEntity<Response<Void>> signupMember(
        @Valid @RequestBody MemberSignupRequest request) {
        memberUseCase.signupMember(MemberSignupCommand.from(request));
        return ResponseEntity.ok().body(Response.success());
    }
}
