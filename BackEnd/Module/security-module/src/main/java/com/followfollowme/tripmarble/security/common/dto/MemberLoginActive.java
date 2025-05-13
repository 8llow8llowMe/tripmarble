package com.followfollowme.tripmarble.security.common.dto;

import com.followfollowme.tripmarble.security.common.enums.SecurityRole;
import lombok.Builder;

@Builder
public record MemberLoginActive(
    long id,
    SecurityRole role
) {

}
