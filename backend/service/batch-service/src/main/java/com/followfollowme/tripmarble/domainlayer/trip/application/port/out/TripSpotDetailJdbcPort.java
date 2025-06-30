package com.followfollowme.tripmarble.domainlayer.trip.application.port.out;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.batch.dto.TripSpotDetailItem;

import java.util.List;

public interface TripSpotDetailJdbcPort {

    void batchInsertTripSpotDetails(List<TripSpotDetailItem> tripSpotDetailItems);
}
