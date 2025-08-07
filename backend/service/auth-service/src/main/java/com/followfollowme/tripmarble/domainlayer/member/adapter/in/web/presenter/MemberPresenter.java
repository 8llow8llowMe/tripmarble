package com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto.MemberMyInfoResponse;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;
import org.springframework.stereotype.Component;

@Component
public class MemberPresenter {

    public MemberMyInfoResponse toMyInfoResponse(Member member) {
        return MemberMyInfoResponse.builder()
            .memberId(member.id())
            .email(member.email())
            .name(member.name())
            .nickname(member.nickname())
            .profileImage(member.profileImage())
            .role(member.role())
            .provider(member.provider())
            .build();
    }
}
