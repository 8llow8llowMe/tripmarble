package com.followfollowme.tripmarble.domainlayer.trip.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripContentTypeInfo;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripContentTypeRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripContentType;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripContentTypeQueryProcessor {

    private final TripContentTypeRepositoryPort tripContentTypeRepositoryPort;

    public List<TripContentTypeInfo> getAllTripContentTypes() {
        List<TripContentType> tripContentTypes = tripContentTypeRepositoryPort.findAll();
        return tripContentTypes.stream()
            .map(TripContentTypeInfo::of)
            .toList();
    }
}
