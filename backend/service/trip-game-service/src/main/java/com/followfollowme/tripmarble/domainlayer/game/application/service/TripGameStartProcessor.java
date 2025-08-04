package com.followfollowme.tripmarble.domainlayer.game.application.service;

import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameMemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMember;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripGameStartProcessor {

    private final TripGameRepositoryPort tripGameRepositoryPort;
    private final TripGameMemberRepositoryPort tripGameMemberRepositoryPort;

    public void startGame(long tripGameId, long hostMemberId) {
        // 1. 게임 정보 조회
        TripGame tripGame = tripGameRepositoryPort.findById(tripGameId)
            .orElseThrow(() -> new IllegalArgumentException("게임을 찾을 수 없습니다."));

        // 2. 방장 여부 확인 (권한 체크)
        TripGameMember hostMember = tripGameMemberRepositoryPort.findHostMemberInGame(tripGameId, hostMemberId)
            .orElseThrow(() -> new IllegalArgumentException("게임 방장을 찾을 수 없습니다."));
        // 3. 참여자들에게 turnOrder 지정

        // 4. 게임 시작 상태 업데이트

        // 5. 저장

        // 6. 반환
    }
}
