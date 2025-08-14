package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.repository.custom;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.projection.TripGameThemeNamesProjection;
import java.util.List;

public interface TripGameThemeMappingCustomRepository {

    List<TripGameThemeNamesProjection> findThemeNamesByTripGameIds(List<Long> tripGameIds);

    List<String> findThemeNamesByTripGameId(long tripGameId);
}
