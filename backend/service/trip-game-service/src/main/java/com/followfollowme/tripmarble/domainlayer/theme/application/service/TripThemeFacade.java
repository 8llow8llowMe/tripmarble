package com.followfollowme.tripmarble.domainlayer.theme.application.service;

import com.followfollowme.tripmarble.domainlayer.theme.adapter.in.web.dto.TripThemeResponse;
import com.followfollowme.tripmarble.domainlayer.theme.adapter.in.web.presenter.TripThemePresenter;
import com.followfollowme.tripmarble.domainlayer.theme.application.port.in.TripThemeWebUseCase;
import com.followfollowme.tripmarble.domainlayer.theme.application.port.out.TripThemeRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.theme.domain.model.TripTheme;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TripThemeFacade implements TripThemeWebUseCase {

    private final TripThemeRepositoryPort tripThemeRepositoryPort;
    private final TripThemePresenter tripThemePresenter;

    @Override
    @Transactional(readOnly = true)
    public List<TripThemeResponse> getAllTripThemes() {
        List<TripTheme> tripThemes = tripThemeRepositoryPort.findAll();
        return tripThemePresenter.toResponseList(tripThemes);
    }
}
