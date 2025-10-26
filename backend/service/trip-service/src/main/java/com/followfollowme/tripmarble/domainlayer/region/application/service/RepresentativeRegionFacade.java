package com.followfollowme.tripmarble.domainlayer.region.application.service;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionDetailResponse;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionSearchResponse;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionSummaryResponse;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.presenter.RepresentativeRegionPresenter;
import com.followfollowme.tripmarble.domainlayer.region.application.info.RepresentativeRegionDetailInfo;
import com.followfollowme.tripmarble.domainlayer.region.application.info.RepresentativeRegionSearchInfo;
import com.followfollowme.tripmarble.domainlayer.region.application.info.RepresentativeRegionSummaryInfo;
import com.followfollowme.tripmarble.domainlayer.region.application.port.in.RepresentativeRegionWebUseCase;
import com.followfollowme.tripmarble.domainlayer.region.application.service.processor.RepresentativeRegionQueryProcessor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RepresentativeRegionFacade implements RepresentativeRegionWebUseCase {

    private final RepresentativeRegionQueryProcessor representativeRegionQueryProcessor;
    private final RepresentativeRegionPresenter representativeRegionPresenter;

    @Override
    @Transactional(readOnly = true)
    public List<RepresentativeRegionSummaryResponse> getAllRepresentativeRegions() {
        List<RepresentativeRegionSummaryInfo> representativeRegionSummaryInfos = representativeRegionQueryProcessor.getAllRepresentativeRegions();
        return representativeRegionPresenter.toSummaryResponseList(representativeRegionSummaryInfos);
    }

    @Override
    @Transactional(readOnly = true)
    public RepresentativeRegionDetailResponse getRepresentativeRegionDetail(long representativeId) {
        RepresentativeRegionDetailInfo representativeRegionDetailInfo =
            representativeRegionQueryProcessor.getRepresentativeRegionDetail(representativeId);
        return representativeRegionPresenter.toDetailResponse(representativeRegionDetailInfo);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RepresentativeRegionSearchResponse> getAutocompleteSuggestions(String keyword) {
        List<RepresentativeRegionSearchInfo> representativeRegionSearchInfos =
            representativeRegionQueryProcessor.getAutocompleteSuggestions(keyword);
        return representativeRegionPresenter.toSearchResponseList(representativeRegionSearchInfos);
    }
}
