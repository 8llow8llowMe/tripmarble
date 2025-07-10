package com.followfollowme.tripmarble.domainlayer.theme.application.port.out;

import com.followfollowme.tripmarble.domainlayer.theme.domain.model.TripTheme;
import java.util.List;

public interface TripThemeRepositoryPort {

    List<TripTheme> findAll();
}
