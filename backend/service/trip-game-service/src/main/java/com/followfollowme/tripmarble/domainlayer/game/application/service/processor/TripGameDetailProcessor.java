package com.followfollowme.tripmarble.domainlayer.game.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.MemberProfileInternalResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.RepresentativeRegionInfoInternalResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameErrorCode;
import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameException;
import com.followfollowme.tripmarble.domainlayer.game.application.info.RepresentativeRegionInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameDetailInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameMemberInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.MemberClientPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.RepresentativeRegionClientPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameMemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameThemeMappingRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMember;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripGameDetailProcessor {

    private final TripGameRepositoryPort tripGameRepositoryPort;
    private final TripGameMemberRepositoryPort tripGameMemberRepositoryPort;
    private final TripGameThemeMappingRepositoryPort tripGameThemeMappingRepositoryPort;
    private final RepresentativeRegionClientPort representativeRegionClientPort;
    private final MemberClientPort memberClientPort;

    public TripGameDetailInfo getTripGameDetail(long tripGameId) {
        // 1. 게임 조회
        TripGame tripGame = tripGameRepositoryPort.findById(tripGameId)
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.GAME_NOT_FOUND));

        // 2. 테마명 조회
        List<String> themeNames = tripGameThemeMappingRepositoryPort.findThemeNamesByTripGameId(tripGameId);

        // 3. 대표 지역 조회 (외부 DTO -> 내부 Info 변환)
        RepresentativeRegionInfoInternalResponse regionResponse =
            representativeRegionClientPort.getRepresentativeRegionInfo(tripGame.representativeRegionId());

        RepresentativeRegionInfo regionInfo = RepresentativeRegionInfo.builder()
            .representativeRegionId(regionResponse.representativeRegionId())
            .representativeRegionName(regionResponse.representativeRegionName())
            .imageUrl(regionResponse.imageUrl())
            .build();

        // 4. 참여자 조회
        List<TripGameMember> members = tripGameMemberRepositoryPort.findAllByTripGameId(tripGameId);

        // 5. 회원 ID 기준 프로필 조회
        List<Long> memberIds = members.stream().map(TripGameMember::memberId).toList();
        List<MemberProfileInternalResponse> memberProfiles = memberClientPort.getMemberProfiles(memberIds);

        // 6. memberId 기준으로 프로필 매핑
        Map<Long, MemberProfileInternalResponse> profileMap = memberProfiles.stream()
            .collect(Collectors.toMap(MemberProfileInternalResponse::memberId, profile -> profile));

        // 7. 참여자 + 프로필 통합 → TripGameMemberInfo 리스트 변환
        List<TripGameMemberInfo> memberInfos = members.stream()
            .map(m -> {
                MemberProfileInternalResponse profile = profileMap.get(m.memberId());
                return TripGameMemberInfo.of(
                    m,
                    profile.nickname(),
                    profile.profileImage()
                );
            })
            .toList();

        // 8. 최종 Info 조합 후 반환
        return TripGameDetailInfo.of(tripGame, regionInfo, themeNames, memberInfos);
    }
}
