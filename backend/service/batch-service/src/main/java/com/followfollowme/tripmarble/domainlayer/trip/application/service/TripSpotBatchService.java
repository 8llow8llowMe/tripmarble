package com.followfollowme.tripmarble.domainlayer.trip.application.service;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.batch.dto.TripSpotItem;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripSpotBatchUseCase;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotJdbcPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TripSpotBatchService implements TripSpotBatchUseCase {

    private final TripSpotJdbcPort tripSpotJdbcPort;

    @Override
    public void registerTripSpots(List<TripSpotItem> tripSpotItems) {
        tripSpotJdbcPort.batchInsertTripSpots(tripSpotItems);
    }
}
