package com.followfollowme.tripmarble.domainlayer.theme.application.port.out;

import com.followfollowme.tripmarble.domainlayer.theme.domain.model.TripThemeContentTypeMapping;
import java.util.List;

public interface TripThemeContentTypeMappingRepositoryPort {

    List<TripThemeContentTypeMapping> findByTripThemeIds(List<Long> tripThemeIds);
}
