package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.repository.custom;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.TripGameEntity;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.GameStatus;
import org.springframework.data.domain.Slice;

public interface TripGameCustomRepository {

    Slice<TripGameEntity> findMyGamesNoOffset(long memberId, long lastTripGameId, int size, GameStatus status);
}
