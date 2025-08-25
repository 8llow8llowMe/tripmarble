package com.followfollowme.tripmarble.domainlayer.auth.application.command;

import com.followfollowme.tripmarble.domainlayer.auth.adapter.in.web.dto.TokenReissueRequest;
import lombok.Builder;

@Builder
public record TokenReissueCommand(
    long memberId
) {

    public static TokenReissueCommand from(TokenReissueRequest request) {
        return TokenReissueCommand.builder()
            .memberId(Long.parseLong(request.memberId()))
            .build();
    }
}
