package com.followfollowme.tripmarble.domainlayer.member.application.mapper;

import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto.MemberMyInfoResponse;
import com.followfollowme.tripmarble.domainlayer.member.adapter.out.persistence.entity.MemberEntity;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    // 엔티티 -> 도메인
    Member toDomainFromEntity(MemberEntity entity);

    // 엔티티 리스트 -> 도메인 리스트
    List<Member> toDomainListFromEntityList(List<MemberEntity> entities);

    // 도메인 -> 엔티티
    MemberEntity toEntityFromDomain(Member domain);

    // 도메인 -> DTO
    @Mapping(source = "id", target = "memberId")
    MemberMyInfoResponse toMyInfoResponseFromDomain(Member domain);
}
