package com.followfollowme.tripmarble.domainlayer.game.application.info;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.MemberProfileResponse;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMember;
import lombok.Builder;

@Builder
public record TripGameMemberWithProfileInfo(
    long memberId,
    String nickname,
    String profileImage,
    int turnOrder,
    boolean isHost
) {

    public static TripGameMemberWithProfileInfo of(TripGameMember member, MemberProfileResponse profile) {
        return TripGameMemberWithProfileInfo.builder()
            .memberId(member.memberId())
            .nickname(profile.nickname())
            .profileImage(profile.profileImage())
            .turnOrder(member.turnOrder())
            .isHost(member.isHost())
            .build();
    }
}
