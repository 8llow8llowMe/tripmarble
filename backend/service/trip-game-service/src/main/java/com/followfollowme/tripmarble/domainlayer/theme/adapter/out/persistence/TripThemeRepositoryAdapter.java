package com.followfollowme.tripmarble.domainlayer.theme.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.theme.adapter.out.persistence.repository.TripThemeRepository;
import com.followfollowme.tripmarble.domainlayer.theme.application.port.out.TripThemeRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.theme.domain.model.TripTheme;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TripThemeRepositoryAdapter implements TripThemeRepositoryPort {

    private final TripThemeRepository tripThemeRepository;

    @Override
    public List<TripTheme> findAll() {
        return null;
    }
}
