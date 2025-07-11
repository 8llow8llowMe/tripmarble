package com.followfollowme.tripmarble.domainlayer.auth.application.service.oauth;

import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.enums.OAuthProvider;
import com.followfollowme.tripmarble.domainlayer.auth.application.port.out.OAuthAuthorizationUrlProvider;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Primary
@Component
public class OAuthAuthorizationUrlRouter implements OAuthAuthorizationUrlProvider {

    private final Map<OAuthProvider, OAuthAuthorizationUrlProvider> urlProviderMap;

    public OAuthAuthorizationUrlRouter(Set<OAuthAuthorizationUrlProvider> providers) {
        this.urlProviderMap = providers.stream()
            .collect(
                Collectors.toMap(OAuthAuthorizationUrlProvider::supports, Function.identity()));
    }

    @Override
    public OAuthProvider supports() {
        return null;
    }

    @Override
    public String generateUrl(OAuthProvider oAuthProvider) {
        return getProvider(oAuthProvider).generateUrl(oAuthProvider);
    }

    private OAuthAuthorizationUrlProvider getProvider(OAuthProvider oAuthProvider) {
        return Optional.ofNullable(urlProviderMap.get(oAuthProvider))
            .orElseThrow(
                () -> new IllegalArgumentException(oAuthProvider + "는 지원하지 않는 OAuthProvider입니다."));
    }
}
