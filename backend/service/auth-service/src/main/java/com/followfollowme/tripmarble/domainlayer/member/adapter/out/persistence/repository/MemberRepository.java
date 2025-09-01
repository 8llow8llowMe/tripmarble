package com.followfollowme.tripmarble.domainlayer.member.adapter.out.persistence.repository;

import com.followfollowme.tripmarble.domainlayer.member.adapter.out.persistence.entity.MemberEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {

    boolean existsByEmail(String email);

    Optional<MemberEntity> findByEmail(String email);

    List<MemberEntity> findByIdIn(List<Long> memberIds);
}
