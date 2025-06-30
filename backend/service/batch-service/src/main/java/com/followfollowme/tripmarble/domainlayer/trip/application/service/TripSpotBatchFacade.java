package com.followfollowme.tripmarble.domainlayer.trip.application.service;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.batch.dto.TripSpotDetailItem;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.batch.dto.TripSpotItem;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripSpotBatchUseCase;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotDetailJdbcPort;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotJdbcPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TripSpotBatchFacade implements TripSpotBatchUseCase {

    private final TripSpotJdbcPort tripSpotJdbcPort;
    private final TripSpotDetailJdbcPort tripSpotDetailJdbcPort;

    @Override
    public void registerTripSpots(List<TripSpotItem> tripSpotItems) {
        tripSpotJdbcPort.batchInsertTripSpots(tripSpotItems);
    }

    @Override
    public List<Integer> fetchAllContentIds() {
        return tripSpotJdbcPort.findAllContentIds();
    }

    @Override
    public void registerTripSpotDetails(List<TripSpotDetailItem> tripSpotDetailItems) {
        tripSpotDetailJdbcPort.batchInsertTripSpotDetails(tripSpotDetailItems);
    }
}
