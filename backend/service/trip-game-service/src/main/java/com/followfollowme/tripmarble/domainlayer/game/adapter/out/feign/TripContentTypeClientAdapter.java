package com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.client.TripContentTypeClient;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.TripContentTypeQueryInternalResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripContentTypeClientPort;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TripContentTypeClientAdapter implements TripContentTypeClientPort {

    private final TripContentTypeClient tripContentTypeClient;

    @Override
    public List<TripContentTypeQueryInternalResponse> getTripContentTypes(List<Long> tripContentTypeIds) {
        return tripContentTypeClient.getTripContentTypes(tripContentTypeIds);
    }
}
