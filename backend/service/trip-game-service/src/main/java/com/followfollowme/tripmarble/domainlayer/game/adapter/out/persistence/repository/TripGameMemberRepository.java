package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.repository;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.TripGameMemberEntity;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.repository.custom.TripGameMemberCustomRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TripGameMemberRepository extends JpaRepository<TripGameMemberEntity, Long>, TripGameMemberCustomRepository {

    @Query("""
            select tgm
            from TripGameMemberEntity tgm
            where tgm.tripGame.id = :tripGameId
              and tgm.memberId = :memberId
              and tgm.isHost = true
        """)
    Optional<TripGameMemberEntity> findHostMemberInGame(long tripGameId, long memberId);

    List<TripGameMemberEntity> findAllByTripGameId(long tripGameId);

    boolean existsByTripGameIdAndMemberId(long tripGameId, long memberId);

    @Query("""
            select m
            from TripGameMemberEntity m
            where m.tripGame.id in :tripGameIds
              and m.memberId = :memberId
        """)
    List<TripGameMemberEntity> findAllByTripGameIdAndMemberId(List<Long> tripGameIds, long memberId);

    Optional<TripGameMemberEntity> findByTripGame_IdAndMemberId(long tripGameId, long memberId);

    @Query("""
            select count(tgm.tripGame.id)
            from TripGameMemberEntity tgm
            where tgm.memberId = :memberId
        """)
    int countTripGameByMemberId(long memberId);
}
