package com.followfollowme.tripmarble.domainlayer.region.application.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionDetailResponse.BoundaryGeoJsonItem;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionDetailResponse.CoordinateGroupItem;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class GeoJsonParserUtil {

    private static final ObjectMapper mapper = new ObjectMapper();

    public static BoundaryGeoJsonItem parse(String json) {
        if (json == null || json.isBlank())
            return null;

        try {
            JsonNode root = mapper.readTree(json);
            String type = root.path("type").asText();
            JsonNode coordsNode = root.path("coordinates");

            List<CoordinateGroupItem> coordinateGroups = extractCoordinateGroups(type, coordsNode);

            return BoundaryGeoJsonItem.builder()
                .type(type)
                .coordinates(coordinateGroups)
                .build();

        } catch (Exception e) {
            return null;
        }
    }

    private static List<CoordinateGroupItem> extractCoordinateGroups(String type, JsonNode coordsNode) {
        List<CoordinateGroupItem> groups = new ArrayList<>();
        if (!coordsNode.isArray())
            return groups;

        for (JsonNode groupNode : coordsNode) {
            JsonNode ringNode = extractRingNode(type, groupNode);
            List<List<Double>> points = parsePointsFromRing(ringNode);
            if (!points.isEmpty()) {
                points = normalizePolygonRing(points);
            }
            groups.add(CoordinateGroupItem.builder().points(points).build());
        }
        return groups;
    }

    private static JsonNode extractRingNode(String type, JsonNode groupNode) {
        if (type.equalsIgnoreCase("Polygon")) {
            return groupNode;
        }
        if (type.equalsIgnoreCase("MultiPolygon")) {
            return groupNode.get(0);
        }
        return null;
    }

    private static List<List<Double>> parsePointsFromRing(JsonNode ringNode) {
        List<List<Double>> points = new ArrayList<>();
        if (ringNode == null || !ringNode.isArray())
            return points;

        for (JsonNode pointNode : ringNode) {
            if (pointNode.isArray() && pointNode.size() == 2) {
                points.add(List.of(pointNode.get(0).asDouble(), pointNode.get(1).asDouble()));
            }
        }
        return points;
    }

    private static List<List<Double>> normalizePolygonRing(List<List<Double>> points) {
        if (points.isEmpty())
            return points;

        List<List<Double>> normalized = new ArrayList<>(points);
        if (!points.getFirst().equals(points.getLast())) {
            normalized.add(points.getFirst());
        }

        double area = calculateSignedArea(normalized);
        if (area > 0) {
            Collections.reverse(normalized);
        }

        return normalized;
    }

    private static double calculateSignedArea(List<List<Double>> polygon) {
        double area = 0.0;
        for (int i = 0; i < polygon.size() - 1; i++) {
            double x1 = polygon.get(i).get(0);
            double y1 = polygon.get(i).get(1);
            double x2 = polygon.get(i + 1).get(0);
            double y2 = polygon.get(i + 1).get(1);
            area += (x2 - x1) * (y2 + y1);
        }
        return area;
    }
}
