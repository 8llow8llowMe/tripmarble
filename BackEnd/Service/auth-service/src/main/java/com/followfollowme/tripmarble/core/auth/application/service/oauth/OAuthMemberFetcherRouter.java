package com.followfollowme.tripmarble.core.auth.application.service.oauth;

import com.followfollowme.tripmarble.core.auth.adapter.out.persistence.external.oauth.vendor.enums.OAuthProvider;
import com.followfollowme.tripmarble.core.auth.application.port.out.OAuthMemberFetcher;
import com.followfollowme.tripmarble.core.member.domain.model.Member;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Primary
@Component
public class OAuthMemberFetcherRouter implements OAuthMemberFetcher {

    private final Map<OAuthProvider, OAuthMemberFetcher> fetcherMap;

    public OAuthMemberFetcherRouter(Set<OAuthMemberFetcher> fetcherSet) {
        this.fetcherMap = fetcherSet.stream()
            .collect(Collectors.toMap(OAuthMemberFetcher::supports, Function.identity()));
    }

    @Override
    public OAuthProvider supports() {
        return null; // Router에서는 사용되지 않음
    }

    @Override
    public Member fetchMember(OAuthProvider oAuthProvider, String authCode) {
        return getFetcher(oAuthProvider).fetchMember(oAuthProvider, authCode);
    }

    private OAuthMemberFetcher getFetcher(OAuthProvider oAuthProvider) {
        return Optional.ofNullable(fetcherMap.get(oAuthProvider))
            .orElseThrow(() ->
                new IllegalArgumentException(oAuthProvider + "는 지원하지 않는 OAuthProvider입니다.")
            );
    }
}
