package com.followfollowme.tripmarble.domainlayer.member.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.member.adapter.out.feign.dto.TripGameCountInternalResponse;
import com.followfollowme.tripmarble.domainlayer.member.adapter.out.feign.dto.TripSpotReviewCountInternalResponse;
import com.followfollowme.tripmarble.domainlayer.member.application.exception.MemberErrorCode;
import com.followfollowme.tripmarble.domainlayer.member.application.exception.MemberException;
import com.followfollowme.tripmarble.domainlayer.member.application.info.MemberActivitySummaryInfo;
import com.followfollowme.tripmarble.domainlayer.member.application.info.MemberMyInfo;
import com.followfollowme.tripmarble.domainlayer.member.application.port.out.MemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.member.application.port.out.TripGameClientPort;
import com.followfollowme.tripmarble.domainlayer.member.application.port.out.TripSpotReviewClientPort;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberInfoProcessor {

    private final MemberRepositoryPort memberRepositoryPort;
    private final TripGameClientPort tripGameClientPort;
    private final TripSpotReviewClientPort tripSpotReviewClientPort;

    public MemberMyInfo loadMyInfo(long memberId) {
        Member member = memberRepositoryPort.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        return MemberMyInfo.of(member);
    }

    public MemberActivitySummaryInfo getMemberActivitySummary(long memberId) {
        // 1. 해당 회원 존재 검증
        if (!memberRepositoryPort.existsById(memberId)) {
            throw new MemberException(MemberErrorCode.NOT_FOUND_MEMBER);
        }

        // 2. 여행 게임 수 조회
        TripGameCountInternalResponse gameCount = tripGameClientPort.getTripGameCountByMember(memberId);

        // 3. 여행 리뷰 및 사진 수 조회
        TripSpotReviewCountInternalResponse reviewCount = tripSpotReviewClientPort.getMyTripSpotReviewAndPhotoCount(memberId);

        // 4. Info 조합
        return MemberActivitySummaryInfo.of(gameCount, reviewCount);
    }
}
