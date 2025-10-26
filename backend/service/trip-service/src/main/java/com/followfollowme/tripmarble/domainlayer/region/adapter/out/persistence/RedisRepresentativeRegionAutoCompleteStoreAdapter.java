package com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.RepresentativeRegionAutoCompleteStorePort;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.RepresentativeRegion;
import com.followfollowme.tripmarble.redis.exception.RedisErrorCode;
import com.followfollowme.tripmarble.redis.exception.RedisInfraException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Duration;
import java.util.Collections;
import java.util.List;

@Component
@RequiredArgsConstructor
public class RedisRepresentativeRegionAutoCompleteStoreAdapter implements RepresentativeRegionAutoCompleteStorePort {

    private static final String KEY_PREFIX = "representative:region:autocomplete:";
    private static final Duration CACHE_TTL = Duration.ofMinutes(10);

    private final RedisTemplate<String, String> redisTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

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
            throw new RedisInfraException(RedisErrorCode.CONNECTION_FAILURE);
        } catch (IOException e) {
            // 역직렬화 실패 시 캐시 삭제 (깨진 데이터 방지)
            redisTemplate.delete(KEY_PREFIX + keyword);
            return Collections.emptyList();
        }
    }

    @Override
    public void save(String keyword, List<RepresentativeRegion> representativeRegions) {
        try {
            String json = objectMapper.writeValueAsString(representativeRegions);
            redisTemplate.opsForValue().set(KEY_PREFIX + keyword, json, CACHE_TTL);
        } catch (RedisConnectionFailureException e) {
            throw new RedisInfraException(RedisErrorCode.CONNECTION_FAILURE);
        } catch (JsonProcessingException e) {
            // 캐시 실패는 무시 (서비스 흐름 영향 X)
        }
    }

    @Override
    public void delete(String keyword) {
        redisTemplate.delete(KEY_PREFIX + keyword);
    }
}
