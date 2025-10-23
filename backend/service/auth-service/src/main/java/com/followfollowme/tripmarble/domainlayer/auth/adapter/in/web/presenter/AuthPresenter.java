package com.followfollowme.tripmarble.domainlayer.auth.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.auth.adapter.in.web.dto.AuthLoginResponse;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.in.web.dto.TokenReissueResponse;
import com.followfollowme.tripmarble.domainlayer.auth.application.info.JwtTokenIssueInfo;
import com.followfollowme.tripmarble.domainlayer.auth.application.info.JwtTokenReissueInfo;
import org.springframework.stereotype.Component;

@Component
public class AuthPresenter {

    public AuthLoginResponse toLoginResponse(JwtTokenIssueInfo info) {
        return AuthLoginResponse.builder()
            .accessToken(info.accessToken())
            .memberId(String.valueOf(info.memberId()))
            .build();
    }

    public TokenReissueResponse toTokenReissueResponse(JwtTokenReissueInfo info) {
        return TokenReissueResponse.builder()
            .accessToken(info.accessToken())
            .build();
    }
}
