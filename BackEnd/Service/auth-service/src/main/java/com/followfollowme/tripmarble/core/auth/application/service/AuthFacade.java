package com.followfollowme.tripmarble.core.auth.application.service;

import com.followfollowme.tripmarble.core.auth.adapter.in.web.dto.AuthLoginResponse;
import com.followfollowme.tripmarble.core.auth.adapter.out.persistence.external.oauth.vendor.enums.OAuthProvider;
import com.followfollowme.tripmarble.core.auth.application.command.AuthLoginCommand;
import com.followfollowme.tripmarble.core.auth.application.port.in.AuthUseCase;
import com.followfollowme.tripmarble.core.auth.application.port.out.OAuthAuthorizationUrlProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthFacade implements AuthUseCase {

    private final CrendentialLoginProcessor crendentialLoginProcessor;
    private final OAuthLoginProcessor oAuthLoginProcessor;
    private final TokenService tokenService;
    private final OAuthAuthorizationUrlProvider oAuthAuthorizationUrlProvider;

    @Override
    public AuthLoginResponse login(AuthLoginCommand command) {
        return crendentialLoginProcessor.login(command);
    }

    @Override
    public void logout(long memberId) {
        tokenService.revoke(memberId);
    }

    @Override
    public String generateOAuthAuthorizationUrl(OAuthProvider provider) {
        return oAuthAuthorizationUrlProvider.generateUrl(provider);
    }

    @Override
    public AuthLoginResponse loginWithOAuthCode(OAuthProvider provider, String authCode) {
        return oAuthLoginProcessor.login(provider, authCode);
    }
}
