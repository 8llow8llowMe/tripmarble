package com.followfollowme.tripmarble.security.common.resolver;

import com.followfollowme.tripmarble.security.common.exception.SecurityErrorCode;

public interface JwtTokenErrorResolver {

    SecurityErrorCode resolve(Throwable ex);
}
