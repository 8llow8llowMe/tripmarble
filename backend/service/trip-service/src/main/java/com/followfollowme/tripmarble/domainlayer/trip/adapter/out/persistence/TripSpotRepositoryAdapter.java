package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.repository.TripSpotRepository;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class TripSpotRepositoryAdapter implements TripSpotRepositoryPort {

    private final TripSpotRepository tripSpotRepository;

    @Override
    public Optional<TripSpot> findById(long tripSpotId) {
        return tripSpotRepository.findById(tripSpotId)
            .map(tripSpotEntity -> TripSpot.builder()
                .contentTypeId(tripSpotEntity.getContentTypeId())
                .contentId(tripSpotEntity.getContentId())
                .title(tripSpotEntity.getTitle())
                .tel(tripSpotEntity.getTel())
                .zipCode(tripSpotEntity.getZipcode())
                .addr1(tripSpotEntity.getAddr1())
                .addr2(tripSpotEntity.getAddr2())
                .mapX(tripSpotEntity.getMapX())
                .mapY(tripSpotEntity.getMapY())
                .mlevel(tripSpotEntity.getMlevel())
                .areaCode(tripSpotEntity.getAreaCode())
                .sigunguCode(tripSpotEntity.getSigunguCode())
                .ldongRegnCd(tripSpotEntity.getLdongRegnCd())
                .ldongSignguCd(tripSpotEntity.getLdongSignguCd())
                .cat1(tripSpotEntity.getCat1())
                .cat2(tripSpotEntity.getCat2())
                .cat3(tripSpotEntity.getCat3())
                .lclsSystm1(tripSpotEntity.getLclsSystm1())
                .lclsSystm2(tripSpotEntity.getLclsSystm2())
                .lclsSystm3(tripSpotEntity.getLclsSystm3())
                .firstImage(tripSpotEntity.getFirstImage())
                .firstImage2(tripSpotEntity.getFirstImage2())
                .cpyrhtDivCd(tripSpotEntity.getCpyrhtDivCd())
                .build());
    }
}
