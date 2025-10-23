package com.followfollowme.tripmarble.domainlayer.member.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.member.adapter.out.persistence.entity.MemberEntity;
import com.followfollowme.tripmarble.domainlayer.member.adapter.out.persistence.repository.MemberRepository;
import com.followfollowme.tripmarble.domainlayer.member.application.mapper.MemberMapper;
import com.followfollowme.tripmarble.domainlayer.member.application.port.out.MemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class MemberRepositoryAdapter implements MemberRepositoryPort {

    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;

    @Override
    public Member save(Member domain) {
        MemberEntity entity = memberMapper.toEntityFromDomain(domain);
        MemberEntity savedEntity = memberRepository.save(entity);
        return memberMapper.toDomainFromEntity(savedEntity);
    }

    @Override
    public boolean existByEmail(String email) {
        return memberRepository.existsByEmail(email);
    }

    @Override
    public Optional<Member> findByEmail(String email) {
        return memberRepository.findByEmail(email)
            .map(memberMapper::toDomainFromEntity);
    }

    @Override
    public Optional<Member> findById(Long memberId) {
        return memberRepository.findById(memberId)
            .map(memberMapper::toDomainFromEntity);
    }

    @Override
    public List<Member> findByIdIn(List<Long> memberIds) {
        List<MemberEntity> entities = memberRepository.findByIdIn(memberIds);
        return memberMapper.toDomainListFromEntityList(entities);
    }

    @Override
    public boolean existsById(long memberId) {
        return memberRepository.existsById(memberId);
    }
}
