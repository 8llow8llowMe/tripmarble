package com.followfollowme.tripmarble.domainlayer.game.domain.model;

import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameErrorCode;
import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameException;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.MissionType;
import lombok.Builder;

@Builder
public record TripGameTile(
    long id,
    long tripGameId,
    long tripSpotId,
    int stepNo,
    MissionType missionType
) {

    public void performReviewMission() {
        if (this.missionType != MissionType.REVIEW) {
            throw new TripGameException(TripGameErrorCode.INVALID_MISSION_TYPE);
        }
    }

    public void performCheckinMission() {
        if (this.missionType != MissionType.CHECKIN_GPS) {
            throw new TripGameException(TripGameErrorCode.INVALID_MISSION_TYPE);
        }
    }
}
