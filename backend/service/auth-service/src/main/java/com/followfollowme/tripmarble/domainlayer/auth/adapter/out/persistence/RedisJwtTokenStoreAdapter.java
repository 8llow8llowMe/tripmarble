package com.followfollowme.tripmarble.domainlayer.auth.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.auth.application.port.out.JwtTokenStorePort;
import com.followfollowme.tripmarble.security.auth.jwt.JwtAuthProperties;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
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
        String key = KEY_PREFIX + memberId;
        redisTemplate.opsForValue().set(key, token, jwtAuthProperties.refreshExpiration());
    }

    @Override
    public Optional<String> find(long memberId) {
        String key = KEY_PREFIX + memberId;
        String token = redisTemplate.opsForValue().get(key);
        return Optional.ofNullable(token);
    }

    @Override
    public void delete(long memberId) {
        String key = KEY_PREFIX + memberId;
        redisTemplate.delete(key);
    }
}
