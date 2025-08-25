package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.TripSpotEntity;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.repository.TripSpotRepository;
import com.followfollowme.tripmarble.domainlayer.trip.application.mapper.TripSpotMapper;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.application.readmodel.TripSpotWithContentTypeName;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class TripSpotRepositoryAdapter implements TripSpotRepositoryPort {

    private final TripSpotRepository tripSpotRepository;
    private final TripSpotMapper tripSpotMapper;

    @Override
    public Optional<TripSpot> findById(long tripSpotId) {
        return tripSpotRepository.findById(tripSpotId)
            .map(tripSpotMapper::toDomainFromEntity);
    }

    @Override
    public Slice<TripSpot> findTripSpotsNoOffsetBySigunguCodesAndLastTripSpotId(
        int ldongRegnCd, List<Integer> ldongSignguCodes, long lastTripSpotId, int size, Integer contentTypeId) {
        Slice<TripSpotEntity> entitySlice = tripSpotRepository.findTripSpotsNoOffsetBySigunguCodesAndLastTripSpotId(
            ldongRegnCd, ldongSignguCodes, lastTripSpotId, size, contentTypeId);

        return entitySlice.map(tripSpotMapper::toDomainFromEntity);
    }

    @Override
    public List<TripSpot> findRandomTripSpotsBySigunguCodesAndContentTypeIds(
        int ldongRegnCd, List<Integer> ldongSignguCodes, List<Integer> contentTypeIds, int limit) {
        List<TripSpotEntity> entities = tripSpotRepository.findRandomTripSpotsBySigunguCodesAndContentTypeIds(
            ldongRegnCd, ldongSignguCodes, contentTypeIds, limit);
        return tripSpotMapper.toDomainListFromEntityList(entities);
    }

    @Override
    public List<TripSpotWithContentTypeName> findAllWithContentTypeNameByIds(List<Long> tripSpotIds) {
        return tripSpotRepository.findAllWithContentTypeNameByIds(tripSpotIds).stream()
            .map(p -> TripSpotWithContentTypeName.builder()
                .tripSpotId(p.tripSpotId())
                .contentTypeName(p.contentTypeName())
                .tripSpotName(p.tripSpotName())
                .longitude(p.longitude())
                .latitude(p.latitude())
                .build())
            .toList();
    }
}
