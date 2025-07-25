package com.followfollowme.tripmarble.domainlayer.auth.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.auth.application.port.out.VerificationCodeStorePort;
import java.time.Duration;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RedisVerificationCodeStoreAdapter implements VerificationCodeStorePort {

    private static final String KEY_PREFIX = "emailVerificationCode:";

    private final RedisTemplate<String, String> redisTemplate;

    @Override
    public void save(String email, String code, int ttlMinutes) {
        String key = getKey(email);
        redisTemplate.opsForValue().set(key, code, Duration.ofMinutes(ttlMinutes));
    }

    @Override
    public Optional<String> find(String email) {
        String key = getKey(email);
        String code = redisTemplate.opsForValue().get(key);
        return Optional.ofNullable(code);
    }

    @Override
    public void delete(String email) {
        String key = getKey(email);
        redisTemplate.delete(key);
    }

    private String getKey(String email) {
        return KEY_PREFIX + email;
    }
}
