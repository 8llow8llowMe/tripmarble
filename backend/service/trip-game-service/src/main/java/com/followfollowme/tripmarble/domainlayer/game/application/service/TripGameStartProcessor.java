package com.followfollowme.tripmarble.domainlayer.game.application.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripGameStartProcessor {

    public void startGame(long tripGameId, long requesterMemberId) {
        // 1. 게임 정보 조회

        // 2. 도메인 서비스에서 시작 가능 여부 검사

        // 3. 참여자들에게 turnOrder 지정

        // 4. 게임 시작 상태 업데이트

        // 5. 저장

        // 6. 반환
    }
}
