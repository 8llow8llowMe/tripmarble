package com.followfollowme.tripmarble.domainlayer.member.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.member.adapter.out.persistence.repository.MemberCommandRepository;
import com.followfollowme.tripmarble.domainlayer.member.application.port.out.MemberCommandRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MemberCommandRepositoryAdapter implements MemberCommandRepositoryPort {

    private final MemberCommandRepository commandRepository;

    @Override
    public Member save(Member domainMember) {
        return null;
    }
}
