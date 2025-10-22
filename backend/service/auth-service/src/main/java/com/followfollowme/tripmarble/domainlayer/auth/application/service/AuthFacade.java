package com.followfollowme.tripmarble.domainlayer.auth.application.service;

import com.followfollowme.tripmarble.domainlayer.auth.adapter.in.web.dto.AuthLoginResponse;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.in.web.dto.TokenReissueResponse;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.in.web.presenter.AuthPresenter;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.enums.OAuthProvider;
import com.followfollowme.tripmarble.domainlayer.auth.application.command.AuthLoginCommand;
import com.followfollowme.tripmarble.domainlayer.auth.application.command.EmailVerificationCommand;
import com.followfollowme.tripmarble.domainlayer.auth.application.command.SendEmailCodeCommand;
import com.followfollowme.tripmarble.domainlayer.auth.application.command.TokenReissueCommand;
import com.followfollowme.tripmarble.domainlayer.auth.application.info.CredentialLoginInfo;
import com.followfollowme.tripmarble.domainlayer.auth.application.info.JwtTokenIssueInfo;
import com.followfollowme.tripmarble.domainlayer.auth.application.info.JwtTokenReissueInfo;
import com.followfollowme.tripmarble.domainlayer.auth.application.info.OAuthLoginInfo;
import com.followfollowme.tripmarble.domainlayer.auth.application.port.in.AuthUseCase;
import com.followfollowme.tripmarble.domainlayer.auth.application.port.out.OAuthAuthorizationUrlProvider;
import com.followfollowme.tripmarble.domainlayer.auth.application.service.processor.CredentialLoginProcessor;
import com.followfollowme.tripmarble.domainlayer.auth.application.service.processor.JwtTokenProcessor;
import com.followfollowme.tripmarble.domainlayer.auth.application.service.processor.MailVerificationProcessor;
import com.followfollowme.tripmarble.domainlayer.auth.application.service.processor.OAuthLoginProcessor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthFacade implements AuthUseCase {

    private final CredentialLoginProcessor credentialLoginProcessor;
    private final OAuthLoginProcessor oAuthLoginProcessor;
    private final JwtTokenProcessor jwtTokenProcessor;
    private final OAuthAuthorizationUrlProvider oAuthAuthorizationUrlProvider;
    private final MailVerificationProcessor mailVerificationProcessor;
    private final AuthPresenter authPresenter;

    @Override
    @Transactional
    public AuthLoginResponse loginWithCredentials(AuthLoginCommand command) {
        // 1. 일반 로그인 자격 검증
        CredentialLoginInfo credentialLoginInfo = credentialLoginProcessor.login(command);

        // 2. 토큰 발급
        JwtTokenIssueInfo tokenIssueInfo = jwtTokenProcessor.issueTokens(credentialLoginInfo.memberId(), credentialLoginInfo.role());

        // 3. Presenter를 통해 Info -> Response 반환
        return authPresenter.toLoginResponse(tokenIssueInfo);
    }

    @Override
    public void logout(long memberId) {
        jwtTokenProcessor.revoke(memberId);
    }

    @Override
    public String generateOAuthAuthorizationUrl(OAuthProvider provider) {
        return oAuthAuthorizationUrlProvider.generateUrl(provider);
    }

    @Override
    @Transactional
    public AuthLoginResponse loginWithOAuthCode(OAuthProvider provider, String authCode) {
        // 1. 소셜 로그인 자격 검증
        OAuthLoginInfo oAuthLoginInfo = oAuthLoginProcessor.login(provider, authCode);

        // 2. 토큰 발급
        JwtTokenIssueInfo tokenIssueInfo = jwtTokenProcessor.issueTokens(oAuthLoginInfo.memberId(), oAuthLoginInfo.role());

        // 3. Presenter를 통해 Info -> Response 변환
        return authPresenter.toLoginResponse(tokenIssueInfo);
    }

    @Override
    public void sendEmailVerificationCode(SendEmailCodeCommand command) {
        mailVerificationProcessor.sendVerificationCode(command.email());
    }

    @Override
    public void verifyEmailCode(EmailVerificationCommand command) {
        mailVerificationProcessor.verifyCode(command.email(), command.code());
    }

    @Override
    @Transactional
    public TokenReissueResponse reissueToken(TokenReissueCommand command) {
        // 1. 토큰 재발급 수행
        JwtTokenReissueInfo reissueInfo = jwtTokenProcessor.reissueTokens(command.memberId());

        // 2. Presenter를 통해 Info -> Response 변환
        return authPresenter.toTokenReissueResponse(reissueInfo);
    }
}
