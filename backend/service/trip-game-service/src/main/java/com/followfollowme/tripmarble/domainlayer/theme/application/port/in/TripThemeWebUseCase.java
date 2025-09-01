package com.followfollowme.tripmarble.domainlayer.theme.application.port.in;

import com.followfollowme.tripmarble.domainlayer.theme.adapter.in.web.dto.TripThemeResponse;
import java.util.List;

public interface TripThemeWebUseCase {

    List<TripThemeResponse> getAllTripThemes();
}
