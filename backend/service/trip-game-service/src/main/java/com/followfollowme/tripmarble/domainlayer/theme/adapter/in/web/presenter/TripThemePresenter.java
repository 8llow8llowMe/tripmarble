package com.followfollowme.tripmarble.domainlayer.theme.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.theme.adapter.in.web.dto.TripThemeResponse;
import com.followfollowme.tripmarble.domainlayer.theme.domain.model.TripTheme;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TripThemePresenter {

    public TripThemeResponse toResponse(TripTheme tripTheme) {
        return TripThemeResponse.builder()
            .tripThemeId(String.valueOf(tripTheme.id()))
            .tripThemeName(tripTheme.name())
            .build();
    }

    public List<TripThemeResponse> toResponseList(List<TripTheme> tripThemes) {
        return tripThemes.stream()
            .map(this::toResponse)
            .toList();
    }
}
