package com.followfollowme.tripmarble.domainlayer.member.application.port.out;

import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;

public interface MemberCommandRepositoryPort {

    Member save(Member domainMember);
}
