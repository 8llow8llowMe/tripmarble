package com.followfollowme.tripmarble.global.infra.tourapi;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record TourApiGenericResponse<T>(
    Header header,
    Body<T> body
) {

    public record Header(
        String resultCode,
        String resultMsg
    ) {

    }

    public record Body<T>(
        Items<T> items,
        int totalCount,
        int pageNo,
        int numOfRows
    ) {

        public record Items<T>(
            List<T> item
        ) {

        }
    }
}
