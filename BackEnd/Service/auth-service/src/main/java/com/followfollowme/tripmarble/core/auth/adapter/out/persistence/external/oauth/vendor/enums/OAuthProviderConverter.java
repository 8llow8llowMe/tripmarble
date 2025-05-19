package com.followfollowme.tripmarble.core.auth.adapter.out.persistence.external.oauth.vendor.enums;

import org.springframework.core.convert.converter.Converter;

public class OAuthProviderConverter implements Converter<String, OAuthProvider> {

    @Override
    public OAuthProvider convert(String source) {
        return OAuthProvider.fromName(source);
    }
}
