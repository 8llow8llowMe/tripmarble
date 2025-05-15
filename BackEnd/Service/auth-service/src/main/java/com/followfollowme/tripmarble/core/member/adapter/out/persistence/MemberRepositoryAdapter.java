package com.followfollowme.tripmarble.core.member.adapter.out.persistence;

import com.followfollowme.tripmarble.core.member.adapter.out.persistence.entity.MemberEntity;
import com.followfollowme.tripmarble.core.member.adapter.out.persistence.repository.MemberRepository;
import com.followfollowme.tripmarble.core.member.application.port.out.MemberRepositoryPort;
import com.followfollowme.tripmarble.core.member.domain.model.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class MemberRepositoryAdapter implements MemberRepositoryPort {

    private final MemberRepository memberRepository;

    @Override
    public Member save(Member domainMember) {
        MemberEntity entity = MemberEntity.builder()
            .id(domainMember.id())
            .email(domainMember.email())
            .password(domainMember.password())
            .name(domainMember.name())
            .nickname(domainMember.nickname())
            .profileImage(domainMember.profileImage())
            .role(domainMember.role())
            .build();

        MemberEntity saved = memberRepository.save(entity);

        return Member.builder()
            .id(saved.getId())
            .email(saved.getEmail())
            .name(saved.getName())
            .nickname(saved.getNickname())
            .password(saved.getPassword())
            .profileImage(saved.getProfileImage())
            .role(saved.getRole())
            .build();
    }

    @Override
    public boolean existByEmail(String email) {
        return memberRepository.existsByEmail(email);
    }

    @Override
    public Optional<Member> findByEmail(String email) {
        return memberRepository.findByEmail(email)
            .map(entity -> Member.builder()
                .id(entity.getId())
                .email(entity.getEmail())
                .name(entity.getName())
                .nickname(entity.getNickname())
                .password(entity.getPassword())
                .profileImage(entity.getProfileImage())
                .role(entity.getRole())
                .build()
            );
    }

    @Override
    public Optional<Member> findById(Long memberId) {
        return memberRepository.findById(memberId)
            .map(entity -> Member.builder()
                .id(entity.getId())
                .email(entity.getEmail())
                .name(entity.getName())
                .nickname(entity.getNickname())
                .password(entity.getPassword())
                .profileImage(entity.getProfileImage())
                .role(entity.getRole())
                .build());
    }

}
