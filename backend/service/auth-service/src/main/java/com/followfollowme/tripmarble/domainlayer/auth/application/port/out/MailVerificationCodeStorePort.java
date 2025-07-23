package com.followfollowme.tripmarble.domainlayer.auth.application.port.out;

import java.util.Optional;

public interface MailVerificationCodeStorePort {

    void save(String email, String code, int ttlMinutes);

    Optional<String> find(String email);

    void delete(String email);
}
