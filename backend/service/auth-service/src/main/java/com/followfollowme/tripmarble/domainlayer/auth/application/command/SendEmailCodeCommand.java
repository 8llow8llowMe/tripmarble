package com.followfollowme.tripmarble.domainlayer.auth.application.command;

import com.followfollowme.tripmarble.domainlayer.auth.adapter.in.web.dto.SendEmailCodeRequest;
import lombok.Builder;

@Builder
public record SendEmailCodeCommand(
    String email
) {

    public static SendEmailCodeCommand from(SendEmailCodeRequest request) {
        return SendEmailCodeCommand.builder()
            .email(request.email())
            .build();
    }
}
