package com.followfollowme.tripmarble.domainlayer.auth.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.auth.application.port.out.VerificationCodeStorePort;
import com.followfollowme.tripmarble.redis.exception.RedisErrorCode;
import com.followfollowme.tripmarble.redis.exception.RedisInfraException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class RedisVerificationCodeStoreAdapter implements VerificationCodeStorePort {

    private static final String KEY_PREFIX = "emailVerificationCode:";

    private final RedisTemplate<String, String> redisTemplate;

    @Override
    public void save(String email, String code, int expiresMin) {
        try {
            String key = getKey(email);
            redisTemplate.opsForValue().set(key, code, Duration.ofMinutes(expiresMin));
        } catch (RedisConnectionFailureException e) {
            throw new RedisInfraException(RedisErrorCode.CONNECTION_FAILURE);
        }
    }

    @Override
    public Optional<String> find(String email) {
        try {
            String key = getKey(email);
            String code = redisTemplate.opsForValue().get(key);
            return Optional.ofNullable(code);
        } catch (RedisConnectionFailureException e) {
            throw new RedisInfraException(RedisErrorCode.CONNECTION_FAILURE);
        }
    }

    @Override
    public void delete(String email) {
        try {
            String key = getKey(email);
            redisTemplate.delete(key);
        } catch (RedisConnectionFailureException e) {
            throw new RedisInfraException(RedisErrorCode.CONNECTION_FAILURE);
        }
    }

    private String getKey(String email) {
        return KEY_PREFIX + email;
    }
}
