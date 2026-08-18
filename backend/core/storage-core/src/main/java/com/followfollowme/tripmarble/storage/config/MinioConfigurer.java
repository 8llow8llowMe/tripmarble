package com.followfollowme.tripmarble.storage.config;

import com.followfollowme.tripmarble.storage.properties.MinioProperties;
import com.followfollowme.tripmarble.storage.util.MinioFileRemover;
import io.minio.MinioClient;
import org.springframework.context.annotation.Bean;

public class MinioConfigurer {

    @Bean
    public MinioClient minioClient(MinioProperties minioProperties) {
        return MinioClient.builder()
            .endpoint(minioProperties.internalUrl())
            .credentials(minioProperties.accessKey(), minioProperties.secretKey())
            .build();
    }

    @Bean
    public MinioFileRemover minioFileRemover(MinioClient minioClient, MinioProperties minioProperties) {
        return new MinioFileRemover(minioClient, minioProperties);
    }
}
