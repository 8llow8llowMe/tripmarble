package com.followfollowme.tripmarble.domainlayer.trip.application.port.out;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.batch.dto.TripSpotItem;

import java.util.List;

public interface TripSpotJdbcPort {

    void batchInsertTripSpots(List<TripSpotItem> tripSpotItems);

    List<Integer> findAllContentIds();
}
