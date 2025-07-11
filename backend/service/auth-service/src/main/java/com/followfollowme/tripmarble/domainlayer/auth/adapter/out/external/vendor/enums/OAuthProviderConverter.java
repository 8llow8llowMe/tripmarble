package com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.enums;

import org.springframework.core.convert.converter.Converter;

public class OAuthProviderConverter implements Converter<String, OAuthProvider> {

    @Override
    public OAuthProvider convert(String source) {
        return OAuthProvider.fromName(source);
    }
}
