package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.controller;

import com.followfollowme.tripmarble.common.dto.Response;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripContentTypeResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripContentTypeWebUseCase;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/trip-content-types")
public class TripContentTypeWebController {

    private final TripContentTypeWebUseCase tripContentTypeWebUseCase;

    @GetMapping
    public ResponseEntity<Response<List<TripContentTypeResponse>>> getAllTripContentTypes() {
        List<TripContentTypeResponse> tripContentTypeResponses = tripContentTypeWebUseCase.getAllTripContentTypes();
        return ResponseEntity.ok().body(Response.success(tripContentTypeResponses));
    }
}
