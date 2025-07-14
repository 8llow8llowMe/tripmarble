package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.repository;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.TripGameMemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripGameMemberRepository extends JpaRepository<TripGameMemberEntity, Long> {

}
