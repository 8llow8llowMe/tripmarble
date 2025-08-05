package com.followfollowme.tripmarble.domainlayer.member.adapter.in.internal.presenter;

import com.followfollowme.tripmarble.domainlayer.member.adapter.in.internal.dto.MemberProfileResponse;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class MemberInternalPresenter {

    public MemberProfileResponse toProfileResponse(Member domain) {
        return MemberProfileResponse.builder()
            .memberId(domain.id())
            .nickname(domain.nickname())
            .profileImage(domain.profileImage())
            .build();
    }

    public List<MemberProfileResponse> toProfileResonseList(List<Member> domains) {
        return domains.stream()
            .map(this::toProfileResponse)
            .toList();
    }
}
