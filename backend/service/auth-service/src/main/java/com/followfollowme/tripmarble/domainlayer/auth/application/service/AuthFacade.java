package com.followfollowme.tripmarble.domainlayer.auth.application.service;

import com.followfollowme.tripmarble.domainlayer.auth.adapter.in.web.dto.AuthLoginResponse;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.in.web.dto.TokenReissueResponse;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.enums.OAuthProvider;
import com.followfollowme.tripmarble.domainlayer.auth.application.command.AuthLoginCommand;
import com.followfollowme.tripmarble.domainlayer.auth.application.command.EmailVerificationCommand;
import com.followfollowme.tripmarble.domainlayer.auth.application.command.SendEmailCodeCommand;
import com.followfollowme.tripmarble.domainlayer.auth.application.command.TokenReissueCommand;
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

    @Override
    @Transactional
    public AuthLoginResponse loginWithCredentials(AuthLoginCommand command) {
        return credentialLoginProcessor.login(command);
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
        return oAuthLoginProcessor.login(provider, authCode);
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
        return jwtTokenProcessor.reissueTokens(command.memberId());
    }
}
