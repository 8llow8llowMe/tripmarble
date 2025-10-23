package com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto.MemberActivitySummaryResponse;
import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto.MemberMyInfoResponse;
import com.followfollowme.tripmarble.domainlayer.member.application.info.MemberActivitySummaryInfo;
import com.followfollowme.tripmarble.domainlayer.member.application.info.MemberMyInfo;
import org.springframework.stereotype.Component;

@Component
public class MemberPresenter {

    public MemberMyInfoResponse toMyInfoResponse(MemberMyInfo info) {
        return MemberMyInfoResponse.builder()
            .memberId(String.valueOf(info.memberId()))
            .email(info.email())
            .name(info.name())
            .nickname(info.nickname())
            .profileImageUrl(info.profileImageUrl())
            .role(info.role())
            .provider(info.provider())
            .build();
    }

    public MemberActivitySummaryResponse toActivitySummaryResponse(MemberActivitySummaryInfo info) {
        return MemberActivitySummaryResponse.builder()
            .memberId(String.valueOf(info.memberId()))
            .tripGameCount(info.tripGameCount())
            .tripSpotReviewCount(info.tripSpotReviewCount())
            .tripSpotReviewPhotoCount(info.tripSpotReviewPhotoCount())
            .build();
    }
}
