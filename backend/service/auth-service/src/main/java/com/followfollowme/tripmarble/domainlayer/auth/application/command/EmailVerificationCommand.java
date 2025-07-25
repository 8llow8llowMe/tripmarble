package com.followfollowme.tripmarble.domainlayer.auth.application.command;

import com.followfollowme.tripmarble.domainlayer.auth.adapter.in.web.dto.EmailVerificationRequest;
import lombok.Builder;

@Builder
public record EmailVerificationCommand(
    String email,
    String code
) {

    public static EmailVerificationCommand from(EmailVerificationRequest request) {
        return EmailVerificationCommand.builder()
            .email(request.email())
            .code(request.code())
            .build();
    }
}
