package com.followfollowme.tripmarble.domainlayer.game.application.mapper;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.TripGameMemberEntity;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMember;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TripGameMemberMapper {

    // 엔티티 -> 도메인
    TripGameMember toDomainFromEntity(TripGameMemberEntity entity);

    // 도메인 -> 엔티티
    TripGameMemberEntity toEntityFromDomain(TripGameMember domain);
}
