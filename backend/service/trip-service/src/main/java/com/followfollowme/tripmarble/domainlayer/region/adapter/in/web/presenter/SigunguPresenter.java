package com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.SigunguResponse;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.Sigungu;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class SigunguPresenter {

    public SigunguResponse toResponse(Sigungu sigungu) {
        return SigunguResponse.builder()
            .sigunguId(sigungu.id())
            .sigunguCode(sigungu.sigunguCode())
            .sigunguName(sigungu.sigunguName())
            .build();
    }

    public List<SigunguResponse> toResponseList(List<Sigungu> sigungus) {
        return sigungus.stream()
            .map(this::toResponse)
            .toList();
    }
}
