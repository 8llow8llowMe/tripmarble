package com.followfollowme.tripmarble.domainlayer.region.adapter.in.batch.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record RegionItem(
    @JsonProperty("code")
    String regionCode,

    @JsonProperty("name")
    String regionName
) {

}
