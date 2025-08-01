package com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.SigunguResponse;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.Sigungu;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class SigunguPresenter {

    public SigunguResponse toResponse(Sigungu domain) {
        return SigunguResponse.builder()
            .sigunguId(domain.id())
            .sigunguCode(domain.sigunguCode())
            .sigunguName(domain.sigunguName())
            .build();
    }

    public List<SigunguResponse> toResponseList(List<Sigungu> domains) {
        return domains.stream()
            .map(this::toResponse)
            .toList();
    }
}
