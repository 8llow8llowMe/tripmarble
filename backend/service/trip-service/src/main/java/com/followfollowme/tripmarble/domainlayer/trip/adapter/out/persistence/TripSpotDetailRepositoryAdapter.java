package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.repository.TripSpotDetailRepository;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotDetailRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpotDetail;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TripSpotDetailRepositoryAdapter implements TripSpotDetailRepositoryPort {

    private final TripSpotDetailRepository tripSpotDetailRepository;

    @Override
    public Optional<TripSpotDetail> findByContentId(String contentId) {
        return tripSpotDetailRepository.findByContentId(contentId)
            .map(tripSpotDetailEntity -> TripSpotDetail.builder()
                .id(tripSpotDetailEntity.getId())
                .contentId(tripSpotDetailEntity.getContentId())
                .homepage(tripSpotDetailEntity.getHomepage())
                .overview(tripSpotDetailEntity.getOverview())
                .createdTime(tripSpotDetailEntity.getCreatedTime())
                .modifiedTime(tripSpotDetailEntity.getModifiedTime())
                .build());
    }
}
