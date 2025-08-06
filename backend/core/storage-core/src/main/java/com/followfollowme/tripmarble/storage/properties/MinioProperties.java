package com.followfollowme.tripmarble.storage.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "minio")
public record MinioProperties(
    String internalUrl,
    String publicUrl,
    String bucketPrefix,
    String accessKey,
    String secretKey
) {

}
