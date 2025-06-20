package com.followfollowme.tripmarble.domainlayer.trip.application.port.out;

import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpotDetail;
import java.util.Optional;

public interface TripSpotDetailRepositoryPort {

    Optional<TripSpotDetail> findByContentId(int contentId);
}
