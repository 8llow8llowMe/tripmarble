package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.repository.custom;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.TripSpotEntity;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.projection.TripSpotWIthContentTypeNameProjection;
import java.util.List;
import org.springframework.data.domain.Slice;

public interface TripSpotCustomRepository {

    Slice<TripSpotEntity> findTripSpotsNoOffsetBySigunguCodesAndLastTripSpotId(
        int ldongRegnCd, List<Integer> ldongSignguCodes, long lastTripSpotId, int size, Integer contentTypeId);

    List<TripSpotEntity> findRandomTripSpotsBySigunguCodesAndContentTypeIds(
        int ldongRegnCd, List<Integer> ldongSignguCodes, List<Integer> contentTypeIds, int limit);

    List<TripSpotWIthContentTypeNameProjection> findAllWithContentTypeNameByIds(List<Long> tripSpotIds);
}
