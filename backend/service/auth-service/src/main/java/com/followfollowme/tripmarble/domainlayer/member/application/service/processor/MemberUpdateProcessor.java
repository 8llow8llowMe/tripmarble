package com.followfollowme.tripmarble.domainlayer.member.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.member.application.command.MemberUpdateCommand;
import com.followfollowme.tripmarble.domainlayer.member.application.exception.MemberErrorCode;
import com.followfollowme.tripmarble.domainlayer.member.application.exception.MemberException;
import com.followfollowme.tripmarble.domainlayer.member.application.port.out.MemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberUpdateProcessor {

    private final MemberRepositoryPort memberRepositoryPort;
    private final ProfileImageProcessor profileImageProcessor;

    public void update(MemberUpdateCommand command) {
        // 1. 기존 회원 정보 조회
        Member member = memberRepositoryPort.findById(command.memberId())
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        // 2. 프로필 이미지 URL 처리
        String profileImageUrl = command.profileImage();
        if (profileImageUrl != null && profileImageUrl.contains("/temp/")) {
            profileImageUrl = profileImageProcessor.promoteToReal(profileImageUrl);
        }

        // 3, 변경된 값으로 새 도메인 객체 빌드
        Member updated = Member.builder()
            .id(member.id())
            .email(member.email())
            .password(member.password())
            .name(member.name())
            .nickname(command.nickname())
            .profileImage(profileImageUrl)
            .role(member.role())
            .provider(member.provider())
            .build();

        // 4. 저장 (merge) -> update
        memberRepositoryPort.save(updated);
    }
}
