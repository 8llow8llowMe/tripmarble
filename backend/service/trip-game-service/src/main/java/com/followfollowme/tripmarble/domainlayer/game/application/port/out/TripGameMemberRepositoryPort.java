package com.followfollowme.tripmarble.domainlayer.game.application.port.out;

import com.followfollowme.tripmarble.domainlayer.game.application.readmodel.TripGameMemberCount;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMember;
import java.util.List;
import java.util.Optional;

public interface TripGameMemberRepositoryPort {

    TripGameMember save(TripGameMember tripGameMember, TripGame tripGame);

    Optional<TripGameMember> findHostMemberInGame(long tripGameId, long memberId);

    List<TripGameMember> findAllByTripGameId(long tripGameId);

    List<TripGameMember> saveAll(List<TripGameMember> tripGameMembers, TripGame tripGame);

    List<TripGameMemberCount> countByTripGameIds(List<Long> gameIds);

    boolean existsByTripGameIdAndMemberId(long tripGameId, long memberId);

    List<TripGameMember> findAllByTripGameIdAndMemberId(List<Long> tripGameIds, long memberId);

    Optional<TripGameMember> findByTripGameIdAndMemberId(long tripGameId, long memberId);

    int countTripGameByMemberId(long memberId);
}
