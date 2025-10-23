package com.followfollowme.tripmarble.domainlayer.game.adapter.in.internal.presenter;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.internal.dto.TripGameCountInternalResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameCountInfo;
import org.springframework.stereotype.Component;

@Component
public class TripGameInternalPresenter {

    public TripGameCountInternalResponse toCountResponse(TripGameCountInfo info) {
        return TripGameCountInternalResponse.builder()
            .memberId(info.memberId())
            .tripGameCount(info.tripGameCount())
            .build();
    }
}
