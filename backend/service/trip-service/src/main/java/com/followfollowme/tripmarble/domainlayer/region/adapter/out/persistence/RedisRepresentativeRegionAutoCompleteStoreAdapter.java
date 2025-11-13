package com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.RepresentativeRegionAutoCompleteStorePort;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.RepresentativeRegion;
import java.io.IOException;
import java.time.Duration;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class RedisRepresentativeRegionAutoCompleteStoreAdapter implements RepresentativeRegionAutoCompleteStorePort {

    private static final String KEY_PREFIX = "representative:region:autocomplete:";
    private static final Duration CACHE_TTL = Duration.ofMinutes(10);

    private final RedisTemplate<String, String> redisTemplate;
    private final ObjectMapper objectMapper;

    @Override
    public List<RepresentativeRegion> find(String keyword) {
        try {
            String json = redisTemplate.opsForValue().get(KEY_PREFIX + keyword);

            if (json == null) {
                return Collections.emptyList();
            }

            return objectMapper.readValue(
                json,
                objectMapper.getTypeFactory().constructCollectionType(List.class, RepresentativeRegion.class)
            );

        } catch (RedisConnectionFailureException e) {
            // Redis 장애는 치명적이지 않음 - 로그만 남기고 계속
            log.error("[RedisRepresentativeRegionAutoCompleteStoreAdapter] Redis 연결 실패 - DB fallback 진행: keyword={}, error={}",
                keyword, e.getMessage());
            return Collections.emptyList();

        } catch (IOException e) {
            // 역직렬화 실패
            log.warn("[RedisRepresentativeRegionAutoCompleteStoreAdapter] 역직렬화 실패: keyword={}", keyword);
            return Collections.emptyList();
        }
    }

    @Override
    public void save(String keyword, List<RepresentativeRegion> regions) {
        try {
            String json = objectMapper.writeValueAsString(regions);
            redisTemplate.opsForValue().set(KEY_PREFIX + keyword, json, CACHE_TTL);
            log.debug("캐시 저장 성공: keyword={}, size={}", keyword, regions.size());

        } catch (RedisConnectionFailureException e) {
            // 캐시 저장 실패는 무시 (서비스 계속)
            log.error("[RedisRepresentativeRegionAutoCompleteStoreAdapter] Redis 연결 실패 - 캐시 저장 실패 (서비스 정상): keyword={}, error={}",
                keyword, e.getMessage());

        } catch (JsonProcessingException e) {
            log.warn("[RedisRepresentativeRegionAutoCompleteStoreAdapter] 직렬화 실패 - 캐시 저장 실패: keyword={}", keyword);
        }
    }

    @Override
    public void delete(String keyword) {
        try {
            redisTemplate.delete(KEY_PREFIX + keyword);
        } catch (RedisConnectionFailureException e) {
            log.error("[RedisRepresentativeRegionAutoCompleteStoreAdapter] Redis 연결 실패 - 캐시 삭제 실패 (무시): keyword={}", keyword);
        }
    }
}