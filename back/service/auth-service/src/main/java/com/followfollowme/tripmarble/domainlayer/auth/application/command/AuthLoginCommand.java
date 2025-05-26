package com.followfollowme.tripmarble.domainlayer.auth.application.command;

import com.followfollowme.tripmarble.domainlayer.auth.adapter.in.web.dto.AuthLoginRequest;
import lombok.Builder;

@Builder
public record AuthLoginCommand(
    String email,
    String password
) {

    public static AuthLoginCommand from(AuthLoginRequest request) {
        return AuthLoginCommand.builder()
            .email(request.email())
            .password(request.password())
            .build();
    }
}
