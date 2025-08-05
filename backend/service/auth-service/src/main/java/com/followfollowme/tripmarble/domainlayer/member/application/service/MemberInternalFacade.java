package com.followfollowme.tripmarble.domainlayer.member.application.service;

import com.followfollowme.tripmarble.domainlayer.member.adapter.in.internal.dto.MemberProfileResponse;
import com.followfollowme.tripmarble.domainlayer.member.adapter.in.internal.presenter.MemberInternalPresenter;
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
    public List<MemberProfileResponse> getMemberProfiles(List<Long> memberIds) {
        List<Member> members = memberRepositoryPort.findByIdIn(memberIds);
        return memberInternalPresenter.toProfileResonseList(members);
    }
}
