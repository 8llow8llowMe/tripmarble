package com.followfollowme.tripmarble.domainlayer.game.application.port.out;

import com.followfollowme.tripmarble.domainlayer.game.application.readmodel.TripGameThemeNames;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameThemeMapping;
import com.followfollowme.tripmarble.domainlayer.theme.domain.model.TripTheme;
import java.util.List;

public interface TripGameThemeMappingRepositoryPort {

    List<TripGameThemeMapping> saveAll(List<TripGameThemeMapping> mappings, TripGame tripGame, List<TripTheme> tripThemes);

    List<TripGameThemeNames> findThemeNamesByTripGameIds(List<Long> tripGameIds);

    List<String> findThemeNamesByTripGameId(long tripGameId);
}
