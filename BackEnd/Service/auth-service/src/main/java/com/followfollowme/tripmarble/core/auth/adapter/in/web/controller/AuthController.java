package com.followfollowme.tripmarble.core.auth.adapter.in.web.controller;

import com.followfollowme.tripmarble.common.dto.Response;
import com.followfollowme.tripmarble.core.auth.adapter.in.web.dto.AuthLoginRequest;
import com.followfollowme.tripmarble.core.auth.adapter.in.web.dto.AuthLoginResponse;
import com.followfollowme.tripmarble.core.auth.application.command.AuthLoginCommand;
import com.followfollowme.tripmarble.core.auth.application.port.in.AuthUseCase;
import com.followfollowme.tripmarble.security.common.dto.MemberLoginActive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthUseCase authUseCase;

    @PostMapping("/login")
    public ResponseEntity<Response<AuthLoginResponse>> login(
        @RequestBody AuthLoginRequest request) {
        AuthLoginResponse loginResponse = authUseCase.loginAuth(AuthLoginCommand.from(request));
        return ResponseEntity.ok().body(Response.success(loginResponse));
    }

    @PostMapping("/logout")
    public ResponseEntity<Response<Void>> logoutMember(
        @AuthenticationPrincipal MemberLoginActive loginActive) {
        authUseCase.logoutAuth(loginActive.id());
        return ResponseEntity.ok().body(Response.success());
    }
}
