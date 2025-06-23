package com.followfollowme.tripmarble.domainlayer.trip.application.port.in;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.batch.dto.TripSpotItem;

import java.util.List;

public interface TripSpotBatchUseCase {

    void registerTripSpots(List<TripSpotItem> tripSpotItems);
}
