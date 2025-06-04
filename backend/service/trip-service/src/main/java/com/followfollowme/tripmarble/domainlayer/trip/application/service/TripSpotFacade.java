package com.followfollowme.tripmarble.domainlayer.trip.application.service;

import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripSpotInternalUseCase;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripSpotWebUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class TripSpotFacade implements TripSpotWebUseCase, TripSpotInternalUseCase {

}
