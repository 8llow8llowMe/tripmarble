package com.followfollowme.tripmarble.domainlayer.auth.application.port.out;

import java.util.Optional;

public interface TokenStorePort {

    void save(long memberId, String refreshToken);

    Optional<String> find(long memberId);

    void delete(long memberId);
}
