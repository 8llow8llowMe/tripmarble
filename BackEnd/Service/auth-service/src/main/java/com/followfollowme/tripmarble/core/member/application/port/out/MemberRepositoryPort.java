package com.followfollowme.tripmarble.core.member.application.port.out;

import com.followfollowme.tripmarble.core.member.domain.model.Member;

import java.util.Optional;

public interface MemberRepositoryPort {

    Member save(Member domainMember);

    boolean existByEmail(String email);

    Optional<Member> findByEmail(String email);

    Optional<Member> findById(Long memberId);
}
