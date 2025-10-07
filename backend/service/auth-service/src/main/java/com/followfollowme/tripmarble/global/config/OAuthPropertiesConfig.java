package com.followfollowme.tripmarble.global.config;

import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.kakao.properties.KakaoOAuthProperties;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.naver.properties.NaverOAuthProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties({
    KakaoOAuthProperties.class,
    NaverOAuthProperties.class
})
public class OAuthPropertiesConfig {

}
