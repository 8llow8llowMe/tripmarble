package com.followfollowme.tripmarble.domainlayer.region.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.RedisRepresentativeRegionAutoCompleteStoreAdapter;
import com.followfollowme.tripmarble.domainlayer.region.application.exception.RegionErrorCode;
import com.followfollowme.tripmarble.domainlayer.region.application.exception.RegionException;
import com.followfollowme.tripmarble.domainlayer.region.application.info.RepresentativeRegionDetailInfo;
import com.followfollowme.tripmarble.domainlayer.region.application.info.RepresentativeRegionSearchInfo;
import com.followfollowme.tripmarble.domainlayer.region.application.info.RepresentativeRegionSummaryInfo;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.RepresentativeRegionRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.RepresentativeRegion;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RepresentativeRegionQueryProcessor {

    private final RepresentativeRegionRepositoryPort representativeRegionRepositoryPort;
    private final RedisRepresentativeRegionAutoCompleteStoreAdapter redisRepresentativeRegionAutoCompleteStoreAdapter;

    public List<RepresentativeRegionSummaryInfo> getAllRepresentativeRegions() {
        List<RepresentativeRegion> representativeRegions = representativeRegionRepositoryPort.findAll();
        return representativeRegions.stream()
            .map(RepresentativeRegionSummaryInfo::of)
            .toList();
    }

    public RepresentativeRegionDetailInfo getRepresentativeRegionDetail(long representativeRegionId) {
        RepresentativeRegion representativeRegion = representativeRegionRepositoryPort.findById(representativeRegionId)
            .orElseThrow(() -> new RegionException(RegionErrorCode.REPRESENTATIVE_REGION_NOT_FOUND));

        return RepresentativeRegionDetailInfo.of(representativeRegion);
    }

    public List<RepresentativeRegionSearchInfo> getAutocompleteSuggestions(String keyword) {
        if (keyword == null || keyword.isBlank()) {
            return List.of();
        }

        // 1. Redis 캐시 조회
        List<RepresentativeRegion> cached = redisRepresentativeRegionAutoCompleteStoreAdapter.find(keyword);
        if (!cached.isEmpty()) {
            return cached.stream()
                .map(RepresentativeRegionSearchInfo::of)
                .toList();
        }

        // 2. DB 조회
        List<RepresentativeRegion> matched = representativeRegionRepositoryPort.findAll().stream()
            .filter(r -> r.name().contains(keyword))
            .limit(10)
            .toList();

        // 3. 캐시 저장
        if (!matched.isEmpty()) {
            redisRepresentativeRegionAutoCompleteStoreAdapter.save(keyword, matched);
        }

        // 4. Info 변환
        return matched.stream()
            .map(RepresentativeRegionSearchInfo::of)
            .toList();
    }
}
