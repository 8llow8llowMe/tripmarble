package com.followfollowme.tripmarble.domainlayer.member.application.port.out;

import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;
import java.util.Optional;

public interface MemberQueryRepositoryPort {

    boolean existByEmail(String email);

    Optional<Member> findByEmail(String email);

    Optional<Member> findById(long memberId);
}
