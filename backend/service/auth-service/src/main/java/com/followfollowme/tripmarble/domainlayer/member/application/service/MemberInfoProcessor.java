package com.followfollowme.tripmarble.domainlayer.member.application.service;

import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto.MemberMyInfoResponse;
import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.presenter.MemberPresenter;
import com.followfollowme.tripmarble.domainlayer.member.application.exception.MemberErrorCode;
import com.followfollowme.tripmarble.domainlayer.member.application.exception.MemberException;
import com.followfollowme.tripmarble.domainlayer.member.application.port.out.MemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberInfoProcessor {

    private final MemberRepositoryPort memberRepositoryPort;
    private final MemberPresenter memberPresenter;

    public MemberMyInfoResponse loadMyInfo(long memberId) {
        Member member = memberRepositoryPort.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        return memberPresenter.toMyInfoResponse(member);
    }
}
