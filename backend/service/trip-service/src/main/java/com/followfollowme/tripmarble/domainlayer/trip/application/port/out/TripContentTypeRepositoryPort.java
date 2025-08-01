package com.followfollowme.tripmarble.domainlayer.trip.application.port.out;

import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripContentType;
import java.util.List;
import java.util.Optional;

public interface TripContentTypeRepositoryPort {

    List<TripContentType> findAll();

    Optional<String> findNameByContentTypeId(int contentTypeId);

    List<TripContentType> findAllById(List<Long> tripContentTypeIds);
}
