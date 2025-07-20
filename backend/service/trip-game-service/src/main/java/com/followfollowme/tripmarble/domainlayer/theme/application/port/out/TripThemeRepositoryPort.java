package com.followfollowme.tripmarble.domainlayer.theme.application.port.out;

import com.followfollowme.tripmarble.domainlayer.theme.domain.model.TripTheme;

import java.util.List;
import java.util.Optional;

public interface TripThemeRepositoryPort {

    List<TripTheme> findAll();

    Optional<TripTheme> findById(Long tripThemeId);

    List<TripTheme> findByIdIn(List<Long> tripThemeIds);
}
