package com.followfollowme.tripmarble.domainlayer.member.application.command;

import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto.MemberUpdateRequest;
import lombok.Builder;

@Builder
public record MemberUpdateCommand(
    long memberId,
    String nickname,
    String profileImageUrl
) {

    public static MemberUpdateCommand from(long memberId, MemberUpdateRequest request) {
        return MemberUpdateCommand.builder()
            .memberId(memberId)
            .nickname(request.nickname())
            .profileImageUrl(request.profileImageUrl())
            .build();
    }
}
