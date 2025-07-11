package com.followfollowme.tripmarble.domainlayer.member.application.mapper;

import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto.MemberMyInfoResponse;
import com.followfollowme.tripmarble.domainlayer.member.adapter.out.persistence.entity.MemberEntity;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    // 엔티티 -> 도메인
    Member toDomainFromEntity(MemberEntity entity);

    // 도메인 -> 엔티티
    MemberEntity toEntityFromDomain(Member domain);

    // 도메인 -> DTO
    MemberMyInfoResponse toMyInfoResponseFromDomain(Member domain);
}
