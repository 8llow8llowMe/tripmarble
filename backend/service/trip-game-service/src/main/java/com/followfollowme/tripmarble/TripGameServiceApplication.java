package com.followfollowme.tripmarble;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication(scanBasePackages = {
    "com.followfollowme.tripmarble.domainlayer",
    "com.followfollowme.tripmarble.global"
})
public class TripGameServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(TripGameServiceApplication.class, args);
    }

}
