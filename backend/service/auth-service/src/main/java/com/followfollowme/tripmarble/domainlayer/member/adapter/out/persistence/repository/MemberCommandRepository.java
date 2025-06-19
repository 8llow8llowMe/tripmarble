package com.followfollowme.tripmarble.domainlayer.member.adapter.out.persistence.repository;

import com.followfollowme.tripmarble.domainlayer.member.adapter.out.persistence.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberCommandRepository extends JpaRepository<MemberEntity, Long> {

}
