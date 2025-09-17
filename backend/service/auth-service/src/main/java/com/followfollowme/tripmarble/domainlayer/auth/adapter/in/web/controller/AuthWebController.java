package com.followfollowme.tripmarble.domainlayer.auth.adapter.in.web.controller;

import com.followfollowme.tripmarble.common.dto.Response;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.in.web.dto.AuthLoginRequest;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.in.web.dto.AuthLoginResponse;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.in.web.dto.EmailVerificationRequest;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.in.web.dto.SendEmailCodeRequest;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.in.web.dto.TokenReissueRequest;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.in.web.dto.TokenReissueResponse;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.enums.OAuthProvider;
import com.followfollowme.tripmarble.domainlayer.auth.application.command.AuthLoginCommand;
import com.followfollowme.tripmarble.domainlayer.auth.application.command.EmailVerificationCommand;
import com.followfollowme.tripmarble.domainlayer.auth.application.command.SendEmailCodeCommand;
import com.followfollowme.tripmarble.domainlayer.auth.application.command.TokenReissueCommand;
import com.followfollowme.tripmarble.domainlayer.auth.application.port.in.AuthUseCase;
import com.followfollowme.tripmarble.security.common.dto.MemberLoginActive;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
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
@Tag(name = "인증/인가", description = "인증/인가 관련 클라이언트에 제공하는 API 입니다.")
public class AuthWebController {

    private final AuthUseCase authUseCase;

    @Operation(
        summary = "일반 로그인",
        description = "이메일과 비밀번호를 입력하여 로그인을 하는 기능입니다."
    )
    @PostMapping("/login")
    public ResponseEntity<Response<AuthLoginResponse>> loginWithCredentials(@RequestBody AuthLoginRequest request) {
        AuthLoginResponse response = authUseCase.loginWithCredentials(AuthLoginCommand.from(request));
        return ResponseEntity.ok().body(Response.success(response));
    }

    @Operation(
        summary = "로그아웃",
        description = "로그인 한 회원을 로그아웃 하는 기능입니다.",
        security = {@SecurityRequirement(name = "bearerAuth")}
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
    @GetMapping("/{provider}/login")
    public ResponseEntity<Response<AuthLoginResponse>> loginWithOAuthCode(
        @PathVariable OAuthProvider provider, @RequestParam("code") String authCode) {
        AuthLoginResponse response = authUseCase.loginWithOAuthCode(provider, authCode);
        return ResponseEntity.ok().body(Response.success(response));
    }

    @Operation(
        summary = "이메일 인증코드 전송",
        description = "입력한 이메일 주소로 인증 코드를 전송하는 기능입니다. 이미 가입된 이메일이라면 예외를 발생시킵니다."
    )
    @PostMapping("/mail/send-code")
    public ResponseEntity<Response<Void>> sendVerificationCode(@Valid SendEmailCodeRequest request) {
        authUseCase.sendEmailVerificationCode(SendEmailCodeCommand.from(request));
        return ResponseEntity.ok().body(Response.success());
    }

    @Operation(
        summary = "이메일 인증코드 검증",
        description = "사용자가 입력한 인증코드가 해당 이메일 주소에 대해 유효한지 검증하는 기능입니다."
    )
    @PostMapping("/mail/verify-code")
    public ResponseEntity<Response<Void>> verifyEmailCode(@RequestBody EmailVerificationRequest request) {
        authUseCase.verifyEmailCode(EmailVerificationCommand.from(request));
        return ResponseEntity.ok().body(Response.success());
    }

    @Operation(
        summary = "토큰 재발급",
        description = "Refresh Token을 통해 Access Token을 재발급 받는 기능입니다."
    )
    @PostMapping("/token/reissue")
    public ResponseEntity<Response<TokenReissueResponse>> reissueToken(@RequestBody TokenReissueRequest request) {
        TokenReissueResponse response = authUseCase.reissueToken(TokenReissueCommand.from(request));
        return ResponseEntity.ok().body(Response.success(response));
    }
}
