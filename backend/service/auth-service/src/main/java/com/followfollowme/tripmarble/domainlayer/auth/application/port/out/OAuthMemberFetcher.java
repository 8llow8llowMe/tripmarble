package com.followfollowme.tripmarble.domainlayer.auth.application.port.out;

import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.enums.OAuthProvider;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;

public interface OAuthMemberFetcher {

    OAuthProvider supports();

    Member fetchMember(OAuthProvider oAuthProvider, String authCode);
}
