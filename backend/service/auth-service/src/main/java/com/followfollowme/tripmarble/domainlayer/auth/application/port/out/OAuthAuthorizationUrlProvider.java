package com.followfollowme.tripmarble.domainlayer.auth.application.port.out;

import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.persistence.external.oauth.vendor.enums.OAuthProvider;

public interface OAuthAuthorizationUrlProvider {

    OAuthProvider supports();

    String generateUrl(OAuthProvider oAuthProvider);
}