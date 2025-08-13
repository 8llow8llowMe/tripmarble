package com.followfollowme.tripmarble.domainlayer.game.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.MemberProfileInternalResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameErrorCode;
import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameException;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameMemberWithProfileInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameStartInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.MemberClientPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameMemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMember;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripGameStartProcessor {

    private final TripGameRepositoryPort tripGameRepositoryPort;
    private final TripGameMemberRepositoryPort tripGameMemberRepositoryPort;
    private final MemberClientPort memberClientPort;

    public TripGameStartInfo startGame(long tripGameId, long hostMemberId) {
        // 1. 게임 정보 조회
        TripGame tripGame = tripGameRepositoryPort.findById(tripGameId)
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.GAME_NOT_FOUND));

        // 2. 방장 여부 확인 (권한 체크)
        TripGameMember hostMember = tripGameMemberRepositoryPort.findHostMemberInGame(tripGameId, hostMemberId)
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.HOST_MEMBER_NOT_FOUND));

        if (!hostMember.isHost()) {
            throw new TripGameException(TripGameErrorCode.NOT_HOST_MEMBER);
        }

        // 3. 모든 인원이 준비 완료인지 확인
        // TODO: 추후에 Redis에 게임 참여자들의 게임 준비 상태를 확인해서 DB에 반영 및 게임 시작 로직 실행하는 방향으로 설계해야함
        List<TripGameMember> members = tripGameMemberRepositoryPort.findByTripGameId(tripGameId);
        if (members.stream().anyMatch(m -> !m.isReady())) {
            throw new TripGameException(TripGameErrorCode.MEMBER_NOT_READY);
        }

        // 4. 턴 순서 무작위 지정
        List<TripGameMember> shuffledMembers = new ArrayList<>(members);
        Collections.shuffle(shuffledMembers);
        List<TripGameMember> membersWithTurnOrder = IntStream.range(0, shuffledMembers.size())
            .mapToObj(i -> shuffledMembers.get(i).assignTurnOrder(i + 1))
            .toList();

        // 5. 참여자 저장 (턴 순서 반영)
        List<TripGameMember> updatedMembers = tripGameMemberRepositoryPort.saveAll(membersWithTurnOrder, tripGame);

        // 6. 게임 상태 변경 및 저장
        TripGame updatedTripGame = tripGameRepositoryPort.save(tripGame.start());

        // 7. 회원 ID 기준 프로필 조회
        List<Long> memberIds = updatedMembers.stream().map(TripGameMember::memberId).toList();
        List<MemberProfileInternalResponse> memberProfiles = memberClientPort.getMemberProfiles(memberIds);

        // 8. memberId 기준으로 매핑
        Map<Long, MemberProfileInternalResponse> profileMap = memberProfiles.stream()
            .collect(Collectors.toMap(MemberProfileInternalResponse::memberId, profile -> profile));

        // 9. 도메인 속성과 외부 프로필 정보를 통합한 DTO 생성
        List<TripGameMemberWithProfileInfo> membersWithProfile = updatedMembers.stream()
            .map(member -> {
                MemberProfileInternalResponse profile = profileMap.get(member.memberId());
                return TripGameMemberWithProfileInfo.of(member, profile);
            })
            .toList();

        // 10. 응답 생성 및 반환
        return TripGameStartInfo.of(updatedTripGame, membersWithProfile);
    }
}
