package com.followfollowme.tripmarble.domainlayer.game.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.MemberProfileInternalResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameErrorCode;
import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameException;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameMemberInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.MemberClientPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameMemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameThemeMappingRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameTileRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMember;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameTile;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Status;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripGameResumeProcessor {

    private final TripGameRepositoryPort tripGameRepositoryPort;
    private final TripGameMemberRepositoryPort tripGameMemberRepositoryPort;
    private final TripGameTileRepositoryPort tripGameTileRepositoryPort;
    private final TripGameThemeMappingRepositoryPort tripGameThemeMappingRepositoryPort;
    private final MemberClientPort memberClientPort;

    public void resumeGame(long tripGameId, long memberId) {
        // 1. 게임 조회 + 상태 검증
        TripGame tripGame = tripGameRepositoryPort.findById(tripGameId)
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.GAME_NOT_FOUND));

        if (tripGame.status() == Status.ENDED) {
            throw new TripGameException(TripGameErrorCode.GAME_ALREADY_ENDED);
        }

        // 2. 참가 여부 검증
        boolean isParticipant = tripGameMemberRepositoryPort.existsByTripGameIdAndMemberId(tripGameId, memberId);
        if (!isParticipant) {
            throw new TripGameException(TripGameErrorCode.MEMBER_NOT_PARTICIPANT);
        }

        // 3. 참가자 / 타일 / 테마 정보 조회
        List<TripGameMember> members = tripGameMemberRepositoryPort.findAllByTripGameId(tripGameId);
        List<TripGameTile> tiles = tripGameTileRepositoryPort.findAllByTripGameId(tripGameId);
        List<String> themeNames = tripGameThemeMappingRepositoryPort.findThemeNamesByTripGameId(tripGameId);

        // 4. 회원 프로필 조회 & 매핑
        List<Long> memberIds = members.stream().map(TripGameMember::memberId).toList();
        Map<Long, MemberProfileInternalResponse> profileMap =
            memberClientPort.getMemberProfiles(memberIds).stream()
                .collect(Collectors.toMap(MemberProfileInternalResponse::memberId, p -> p));

        List<TripGameMemberInfo> memberInfos = members.stream()
            .map(m -> TripGameMemberInfo.of(m,
                profileMap.get(m.memberId()).nickname(),
                profileMap.get(m.memberId()).profileImageUrl()))
            .toList();

        // TODO: 타일 Info 변환

        // 4. Info 조합
//        return TripGameResumeInfo.of(tripGame, members, tiles, themeNames);
    }
}
