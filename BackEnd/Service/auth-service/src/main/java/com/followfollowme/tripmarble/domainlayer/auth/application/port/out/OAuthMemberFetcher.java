package com.followfollowme.tripmarble.domainlayer.auth.application.port.out;

import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.persistence.external.oauth.vendor.enums.OAuthProvider;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;

public interface OAuthMemberFetcher {

    OAuthProvider supports();

    Member fetchMember(OAuthProvider oAuthProvider, String authCode);
}
