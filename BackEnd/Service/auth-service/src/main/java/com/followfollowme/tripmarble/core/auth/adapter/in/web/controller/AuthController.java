package com.followfollowme.tripmarble.core.auth.adapter.in.web.controller;

import com.followfollowme.tripmarble.common.dto.Response;
import com.followfollowme.tripmarble.core.auth.adapter.in.web.dto.AuthLoginRequest;
import com.followfollowme.tripmarble.core.auth.adapter.in.web.dto.AuthLoginResponse;
import com.followfollowme.tripmarble.core.auth.adapter.out.persistence.external.oauth.vendor.enums.OAuthProvider;
import com.followfollowme.tripmarble.core.auth.application.command.AuthLoginCommand;
import com.followfollowme.tripmarble.core.auth.application.port.in.AuthUseCase;
import com.followfollowme.tripmarble.security.common.dto.MemberLoginActive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthUseCase authUseCase;

    @PostMapping("/login")
    public ResponseEntity<Response<AuthLoginResponse>> login(
        @RequestBody AuthLoginRequest request) {
        AuthLoginResponse loginResponse = authUseCase.login(AuthLoginCommand.from(request));
        return ResponseEntity.ok().body(Response.success(loginResponse));
    }

    @PostMapping("/logout")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Response<Void>> logout(
        @AuthenticationPrincipal MemberLoginActive loginActive) {
        authUseCase.logout(loginActive.id());
        return ResponseEntity.ok().body(Response.success());
    }

    @GetMapping("/{provider}/authorize")
    public ResponseEntity<Response<String>> generateOAuthAuthorizationUrl(
        @PathVariable OAuthProvider provider) {
        String redirectUrl = authUseCase.generateOAuthAuthorizationUrl(provider);
        return ResponseEntity.ok().body(Response.success(redirectUrl));
    }

    @PostMapping("/{provider}/login")
    public ResponseEntity<Response<AuthLoginResponse>> loginWithOAuthCode(
        @PathVariable OAuthProvider provider, @RequestParam("code") String authCode) {
        AuthLoginResponse loginResponse = authUseCase.loginWithOAuthCode(provider, authCode);
        return ResponseEntity.ok().body(Response.success(loginResponse));
    }
}
