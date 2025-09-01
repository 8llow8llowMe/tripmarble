package com.followfollowme.tripmarble.domainlayer.member.adapter.in.internal.presenter;

import com.followfollowme.tripmarble.domainlayer.member.adapter.in.internal.dto.MemberProfileInternalResponse;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class MemberInternalPresenter {

    public MemberProfileInternalResponse toProfileResponse(Member member) {
        return MemberProfileInternalResponse.builder()
            .memberId(member.id())
            .nickname(member.nickname())
            .profileImageUrl(member.profileImageUrl())
            .build();
    }

    public List<MemberProfileInternalResponse> toProfileResonseList(List<Member> members) {
        return members.stream()
            .map(this::toProfileResponse)
            .toList();
    }
}
