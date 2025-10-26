package com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionDetailResponse;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionSearchResponse;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionSummaryResponse;
import com.followfollowme.tripmarble.domainlayer.region.application.info.RepresentativeRegionDetailInfo;
import com.followfollowme.tripmarble.domainlayer.region.application.info.RepresentativeRegionSearchInfo;
import com.followfollowme.tripmarble.domainlayer.region.application.info.RepresentativeRegionSummaryInfo;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RepresentativeRegionPresenter {

    public RepresentativeRegionSummaryResponse toSummaryResponse(RepresentativeRegionSummaryInfo info) {
        return RepresentativeRegionSummaryResponse.builder()
            .representativeRegionId(String.valueOf(info.representativeRegionId()))
            .representativeRegionName(info.representativeRegionName())
            .representativeRegionImageUrl(info.representativeRegionImageUrl())
            .build();
    }

    public List<RepresentativeRegionSummaryResponse> toSummaryResponseList(List<RepresentativeRegionSummaryInfo> infos) {
        return infos.stream()
            .map(this::toSummaryResponse)
            .toList();
    }

    public RepresentativeRegionDetailResponse toDetailResponse(RepresentativeRegionDetailInfo info) {
        return RepresentativeRegionDetailResponse.builder()
            .representativeRegionId(String.valueOf(info.representativeRegionId()))
            .representativeRegionName(info.representativeRegionName())
            .representativeRegionImageUrl(info.representativeRegionImageUrl())
            .description(info.description())
            .longitude(info.longitude())
            .latitude(info.latitude())
            .boundaryGeoJson(info.boundaryGeoJson())
            .build();
    }

    public RepresentativeRegionSearchResponse toSearchResponse(RepresentativeRegionSearchInfo info) {
        return RepresentativeRegionSearchResponse.builder()
            .representativeRegionId(String.valueOf(info.representativeRegionId()))
            .representativeRegionName(info.representativeRegionName())
            .build();
    }

    public List<RepresentativeRegionSearchResponse> toSearchResponseList(List<RepresentativeRegionSearchInfo> infos) {
        return infos.stream()
            .map(this::toSearchResponse)
            .toList();
    }
}
