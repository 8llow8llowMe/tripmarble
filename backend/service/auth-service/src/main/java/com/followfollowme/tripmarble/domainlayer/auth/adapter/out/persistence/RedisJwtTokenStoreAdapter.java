package com.followfollowme.tripmarble.domainlayer.auth.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.auth.application.port.out.JwtTokenStorePort;
import com.followfollowme.tripmarble.redis.exception.RedisErrorCode;
import com.followfollowme.tripmarble.redis.exception.RedisInfraException;
import com.followfollowme.tripmarble.security.auth.jwt.JwtAuthProperties;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RedisJwtTokenStoreAdapter implements JwtTokenStorePort {

    private static final String KEY_PREFIX = "refreshToken:";
    private final RedisTemplate<String, String> redisTemplate;
    private final JwtAuthProperties jwtAuthProperties;

    @Override
    public void save(long memberId, String token) {
        try {
            redisTemplate.opsForValue().set(buildKey(memberId), token, jwtAuthProperties.refreshExpiration());
        } catch (RedisConnectionFailureException e) {
            throw new RedisInfraException(RedisErrorCode.CONNECTION_FAILURE);
        }

    }

    @Override
    public Optional<String> find(long memberId) {
        String token = redisTemplate.opsForValue().get(buildKey(memberId));
        return Optional.ofNullable(token);
    }

    @Override
    public void delete(long memberId) {
        redisTemplate.delete(buildKey(memberId));
    }

    private String buildKey(long memberId) {
        return KEY_PREFIX + memberId;
    }
}
