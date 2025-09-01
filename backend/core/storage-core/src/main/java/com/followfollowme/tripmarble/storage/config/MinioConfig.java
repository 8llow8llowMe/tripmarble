package com.followfollowme.tripmarble.storage.config;

import com.followfollowme.tripmarble.storage.properties.MinioProperties;
import io.minio.MinioClient;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class MinioConfig {

    private final MinioProperties minioProperties;

    @Bean
    public MinioClient minioClient() {
        return MinioClient.builder()
            .endpoint(minioProperties.internalUrl())
            .credentials(minioProperties.accessKey(), minioProperties.secretKey())
            .build();
    }
}
