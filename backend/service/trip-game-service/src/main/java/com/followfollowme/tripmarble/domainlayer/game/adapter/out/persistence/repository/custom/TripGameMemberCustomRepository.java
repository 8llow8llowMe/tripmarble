package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.repository.custom;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.projection.TripGameMemberCountProjection;
import java.util.List;

public interface TripGameMemberCustomRepository {

    List<TripGameMemberCountProjection> countByTripGameIds(List<Long> tripGameIds);
}
