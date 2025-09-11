package com.followfollowme.tripmarble.domainlayer.member.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.member.application.exception.MemberErrorCode;
import com.followfollowme.tripmarble.domainlayer.member.application.exception.MemberException;
import com.followfollowme.tripmarble.domainlayer.member.application.port.out.MemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberRestoreProcessor {

    private final MemberRepositoryPort memberRepositoryPort;

    public void restore(long memberId, String newName, String newNickname) {
        Member member = memberRepositoryPort.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        // 도메인에 위임 → 상태 검증 + 복구 처리
        Member restored = member.restore(newName, newNickname);

        memberRepositoryPort.save(restored);
    }
}
