package com.followfollowme.tripmarble.domainlayer.game.application.service;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameCreateResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.command.TripGameCreateCommand;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameCreateInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.port.in.TripGameWebUseCase;
import com.followfollowme.tripmarble.domainlayer.theme.domain.model.TripTheme;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TripGameFacade implements TripGameWebUseCase {

    private final TripGameCreateService tripGameCreateService;

    @Override
    @Transactional
    public TripGameCreateResponse crateTripGame(TripGameCreateCommand command) {
        TripGameCreateInfo info = tripGameCreateService.createTripGame(command);

        return TripGameCreateResponse.builder()
            .tripGameId(info.tripGame().id())
            .status(info.tripGame().status())
            .statusMessage(info.tripGame().status().getDescription())
            .difficulty(info.tripGame().difficulty())
            .difficultyMessage(info.tripGame().difficulty().getDescription())
            .startedAt(info.tripGame().startedAt())
            .endedAt(info.tripGame().endedAt())
            .tripThemeNames(info.tripThemes().stream()
                .map(TripTheme::name)
                .toList())
            .representativeRegionName(info.representativeRegionInfo().representativeRegionName())
            .isHost(info.tripGameMember().isHost())
            .isReady(info.tripGameMember().isReady())
            .build();
    }
}
