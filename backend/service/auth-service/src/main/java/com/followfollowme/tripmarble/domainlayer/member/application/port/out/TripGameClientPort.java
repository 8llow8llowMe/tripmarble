package com.followfollowme.tripmarble.domainlayer.member.application.port.out;

import com.followfollowme.tripmarble.domainlayer.member.adapter.out.feign.dto.TripGameCountInternalResponse;
import org.springframework.web.bind.annotation.PathVariable;

public interface TripGameClientPort {

    TripGameCountInternalResponse getTripGameCountByMember(@PathVariable long memberId);
}
