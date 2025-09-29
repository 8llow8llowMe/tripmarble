package com.followfollowme.tripmarble.domainlayer.review.application.info;

import com.followfollowme.tripmarble.domainlayer.review.adapter.out.feign.dto.MemberProfileInternalResponse;
import lombok.Builder;

@Builder
public record MemberProfileInfo(
    long memberId,
    String nickname,
    String profileImageUrl
) {

    public static MemberProfileInfo from(MemberProfileInternalResponse response) {
        return MemberProfileInfo.builder()
            .memberId(response.memberId())
            .nickname(response.nickname())
            .profileImageUrl(response.profileImageUrl())
            .build();
    }
}
