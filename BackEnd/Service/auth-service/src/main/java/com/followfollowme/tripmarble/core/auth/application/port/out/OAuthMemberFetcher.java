package com.followfollowme.tripmarble.core.auth.application.port.out;

import com.followfollowme.tripmarble.core.auth.adapter.out.persistence.external.oauth.vendor.enums.OAuthProvider;
import com.followfollowme.tripmarble.core.member.domain.model.Member;

public interface OAuthMemberFetcher {

    OAuthProvider supports();

    Member fetchMember(OAuthProvider oAuthProvider, String authCode);
}
