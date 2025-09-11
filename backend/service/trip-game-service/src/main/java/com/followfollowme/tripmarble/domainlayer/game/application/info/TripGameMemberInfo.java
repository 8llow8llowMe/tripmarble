package com.followfollowme.tripmarble.domainlayer.game.application.info;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMember;
import lombok.Builder;

@Builder
public record TripGameMemberInfo(
    long memberId,
    String nickname,
    String profileImageUrl,
    int turnOrder,
    boolean isHost
) {

    public static TripGameMemberInfo of(TripGameMember member, String nickname, String profileImageUrl) {
        return TripGameMemberInfo.builder()
            .memberId(member.memberId())
            .nickname(nickname)
            .profileImageUrl(profileImageUrl)
            .turnOrder(member.turnOrder())
            .isHost(member.isHost())
            .build();
    }
}
