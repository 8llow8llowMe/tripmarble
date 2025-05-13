package com.followfollowme.tripmarble.core.member.domain.model;

import com.followfollowme.tripmarble.security.common.enums.SecurityRole;
import lombok.Builder;

@Builder
public record Member(
    Long id,
    String email,
    String password,
    String name,
    String nickname,
    String profileImage,
    SecurityRole role
) {

}
