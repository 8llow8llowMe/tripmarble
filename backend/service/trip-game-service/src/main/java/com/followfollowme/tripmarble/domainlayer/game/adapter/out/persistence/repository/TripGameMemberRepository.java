package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.repository;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.TripGameMemberEntity;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.repository.custom.TripGameMemberCustomRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TripGameMemberRepository extends JpaRepository<TripGameMemberEntity, Long>, TripGameMemberCustomRepository {

    @Query("""
            SELECT tgm
            FROM TripGameMemberEntity tgm
            WHERE tgm.tripGame.id = :tripGameId
              AND tgm.memberId = :memberId
              AND tgm.isHost = true
        """)
    Optional<TripGameMemberEntity> findHostMemberInGame(long tripGameId, long memberId);

    List<TripGameMemberEntity> findByTripGameId(long tripGameId);

    boolean existsByTripGameIdAndMemberId(long tripGameId, long memberId);
}
