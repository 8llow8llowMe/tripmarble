package com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.SigunguResponse;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.Sigungu;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SigunguPresenter {

    public SigunguResponse toResponse(Sigungu sigungu) {
        return SigunguResponse.builder()
            .sigunguId(String.valueOf(sigungu.id()))
            .sigunguCode(String.valueOf(sigungu.sigunguCode()))
            .sigunguName(sigungu.sigunguName())
            .build();
    }

    public List<SigunguResponse> toResponseList(List<Sigungu> sigungus) {
        return sigungus.stream()
            .map(this::toResponse)
            .toList();
    }
}
