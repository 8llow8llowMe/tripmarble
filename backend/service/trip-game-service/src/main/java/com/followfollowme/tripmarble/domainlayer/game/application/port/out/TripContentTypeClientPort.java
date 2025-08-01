package com.followfollowme.tripmarble.domainlayer.game.application.port.out;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.TripContentTypeInternalResponse;
import java.util.List;

public interface TripContentTypeClientPort {

    List<TripContentTypeInternalResponse> getTripContentTypes(List<Long> tripContentTypeIds);
}
