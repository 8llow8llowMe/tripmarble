package com.followfollowme.tripmarble.domainlayer.member.application.port.out;

import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRepositoryPort {

    Member save(Member domain);

    boolean existByEmail(String email);

    Optional<Member> findByEmail(String email);

    Optional<Member> findById(Long memberId);

    List<Member> findByIdIn(List<Long> memberIds);

    boolean existsById(long memberId);
}
