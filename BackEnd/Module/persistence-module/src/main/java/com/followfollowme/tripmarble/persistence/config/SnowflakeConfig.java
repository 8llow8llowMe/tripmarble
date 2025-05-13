package com.followfollowme.tripmarble.persistence.config;

import com.followfollowme.tripmarble.persistence.properties.SnowflakeProperties;
import com.followfollowme.tripmarble.persistence.util.SnowflakeIdGenerator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SnowflakeConfig {

    @Bean
    public SnowflakeIdGenerator snowflakeIdGenerator(SnowflakeProperties properties) {
        // 서버마다 workerId / dataCenterId를 다르게 설정해줘야함
        return new SnowflakeIdGenerator(properties.datacenterId(), properties.workerId());
    }
}

