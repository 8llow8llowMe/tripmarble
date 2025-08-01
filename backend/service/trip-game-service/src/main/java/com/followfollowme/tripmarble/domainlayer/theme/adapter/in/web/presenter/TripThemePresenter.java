package com.followfollowme.tripmarble.domainlayer.theme.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.theme.adapter.in.web.dto.TripThemeResponse;
import com.followfollowme.tripmarble.domainlayer.theme.domain.model.TripTheme;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class TripThemePresenter {

    public TripThemeResponse toResponse(TripTheme domain) {
        return TripThemeResponse.builder()
            .tripThemeId(domain.id())
            .tripThemeName(domain.name())
            .build();
    }

    public List<TripThemeResponse> toResponseList(List<TripTheme> domains) {
        return domains.stream()
            .map(this::toResponse)
            .toList();
    }
}
