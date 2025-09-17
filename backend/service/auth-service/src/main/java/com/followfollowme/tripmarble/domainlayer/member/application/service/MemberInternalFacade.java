package com.followfollowme.tripmarble.domainlayer.member.application.service;

import com.followfollowme.tripmarble.domainlayer.member.adapter.in.internal.dto.MemberProfileInternalResponse;
import com.followfollowme.tripmarble.domainlayer.member.adapter.in.internal.presenter.MemberInternalPresenter;
import com.followfollowme.tripmarble.domainlayer.member.application.exception.MemberErrorCode;
import com.followfollowme.tripmarble.domainlayer.member.application.exception.MemberException;
import com.followfollowme.tripmarble.domainlayer.member.application.port.in.MemberInternalUseCase;
import com.followfollowme.tripmarble.domainlayer.member.application.port.out.MemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberInternalFacade implements MemberInternalUseCase {

    private final MemberRepositoryPort memberRepositoryPort;
    private final MemberInternalPresenter memberInternalPresenter;

    @Override
    @Transactional(readOnly = true)
    public List<MemberProfileInternalResponse> getMemberProfiles(List<Long> memberIds) {
        List<Member> members = memberRepositoryPort.findByIdIn(memberIds);
        return memberInternalPresenter.toProfileResonseList(members);
    }

    @Override
    @Transactional(readOnly = true)
    public MemberProfileInternalResponse getMemberProfiles(long memberId) {
        Member member = memberRepositoryPort.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));
        return memberInternalPresenter.toProfileResponse(member);
    }
}
