package com.followfollowme.tripmarble.domainlayer.game.application.port.out;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.TripContentTypeQueryInternalResponse;
import java.util.List;

public interface TripContentTypeClientPort {

    List<TripContentTypeQueryInternalResponse> getTripContentTypes(List<Long> tripContentTypeIds);
}
