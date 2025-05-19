package com.followfollowme.tripmarble.core.auth.application.port.out;

import com.followfollowme.tripmarble.core.auth.adapter.out.persistence.external.oauth.vendor.enums.OAuthProvider;

public interface OAuthAuthorizationUrlProvider {

    OAuthProvider supports();

    String generateUrl(OAuthProvider oAuthProvider);
}