package com.followfollowme.tripmarble.domainlayer.member.adapter.in.internal.presenter;

import com.followfollowme.tripmarble.domainlayer.member.adapter.in.internal.dto.MemberProfileResponse;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class MemberInternalPresenter {

    public MemberProfileResponse toProfileResponse(Member member) {
        return MemberProfileResponse.builder()
            .memberId(member.id())
            .nickname(member.nickname())
            .profileImageUrl(member.profileImageUrl())
            .build();
    }

    public List<MemberProfileResponse> toProfileResonseList(List<Member> members) {
        return members.stream()
            .map(this::toProfileResponse)
            .toList();
    }
}
