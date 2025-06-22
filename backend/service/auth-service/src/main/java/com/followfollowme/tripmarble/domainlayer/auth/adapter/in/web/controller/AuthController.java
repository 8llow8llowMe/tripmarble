package com.followfollowme.tripmarble.domainlayer.auth.adapter.in.web.controller;

import com.followfollowme.tripmarble.common.dto.Response;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.in.web.dto.AuthLoginRequest;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.in.web.dto.AuthLoginResponse;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.persistence.external.oauth.vendor.enums.OAuthProvider;
import com.followfollowme.tripmarble.domainlayer.auth.application.command.AuthLoginCommand;
import com.followfollowme.tripmarble.domainlayer.auth.application.port.in.AuthUseCase;
import com.followfollowme.tripmarble.security.common.dto.MemberLoginActive;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "인증/인가", description = "인증/인가 관련 API 입니다.")
public class AuthController {

    private final AuthUseCase authUseCase;

    @Operation(
        summary = "일반 로그인",
        description = "이메일과 비밀번호를 입력하여 로그인을 하는 기능입니다."
    )
    @PostMapping("/login")
    public ResponseEntity<Response<AuthLoginResponse>> login(@RequestBody AuthLoginRequest request) {
        AuthLoginResponse loginResponse = authUseCase.login(AuthLoginCommand.from(request));
        return ResponseEntity.ok().body(Response.success(loginResponse));
    }

    @Operation(
        summary = "로그아웃",
        description = "로그인 한 회원을 로그아웃 하는 기능입니다."
    )
    @PostMapping("/logout")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Response<Void>> logout(@AuthenticationPrincipal MemberLoginActive loginActive) {
        authUseCase.logout(loginActive.id());
        return ResponseEntity.ok().body(Response.success());
    }

    @Operation(
        summary = "소셜 로그인 제공업체를 통한 인증코드 가져오기",
        description = "소셜 로그인을 하기 전 인증코드를 가져와 "
            + "소셜 제공업체(EX. 카카오, 네이버 등)에 가입된 회원정보를 가져오는 기능입니다."
    )
    @GetMapping("/{provider}/authorize")
    public ResponseEntity<Response<String>> generateOAuthAuthorizationUrl(@PathVariable OAuthProvider provider) {
        String redirectUrl = authUseCase.generateOAuthAuthorizationUrl(provider);
        return ResponseEntity.ok().body(Response.success(redirectUrl));
    }

    @Operation(
        summary = "소셜 로그인",
        description = "인증코드를 통해 소셜 로그인을 하는 기능입니다. "
            + "해당 서비스에 회원 정보가 없는 경우 회원가입 후 로그인을 하는 기능입니다."
    )
    @PostMapping("/{provider}/login")
    public ResponseEntity<Response<AuthLoginResponse>> loginWithOAuthCode(
        @PathVariable OAuthProvider provider, @RequestParam("code") String authCode) {
        AuthLoginResponse loginResponse = authUseCase.loginWithOAuthCode(provider, authCode);
        return ResponseEntity.ok().body(Response.success(loginResponse));
    }
}
