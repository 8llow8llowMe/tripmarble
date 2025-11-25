package com.followfollowme.tripmarble.domainlayer.auth.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.auth.application.port.out.VerificationCodeStorePort;
import java.time.Duration;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class RedisVerificationCodeStoreAdapter implements VerificationCodeStorePort {

    private static final String KEY_PREFIX = "emailVerificationCode:";
    private final RedisTemplate<String, String> redisTemplate;

    @Override
    public boolean save(String email, String code, int expiresMin) {
        try {
            String key = getKey(email);
            redisTemplate.opsForValue().set(key, code, Duration.ofMinutes(expiresMin));
            return true;
        } catch (RedisConnectionFailureException e) {
            // 로그만 남기고 false 반환 (Application Layer는 Redis 장애를 모름)
            log.error("[RedisVerificationCodeStoreAdapter] 인증 코드 저장 실패: email={}, error={}",
                email, e.getMessage());
            return false;
        }
    }

    @Override
    public Optional<String> find(String email) {
        try {
            String key = getKey(email);
            String code = redisTemplate.opsForValue().get(key);
            return Optional.ofNullable(code);
        } catch (RedisConnectionFailureException e) {
            log.error("[RedisVerificationCodeStoreAdapter] 인증 코드 조회 실패: email={}, error={}",
                email, e.getMessage());
            return Optional.empty();
        }
    }

    @Override
    public void delete(String email) {
        try {
            String key = getKey(email);
            redisTemplate.delete(key);
        } catch (RedisConnectionFailureException e) {
            log.error("[RedisVerificationCodeStoreAdapter] 인증 코드 삭제 실패 (무시): email={}", email);
            // 삭제 실패는 무시 (이미 만료되었을 수도 있음)
        }
    }

    private String getKey(String email) {
        return KEY_PREFIX + email;
    }
}