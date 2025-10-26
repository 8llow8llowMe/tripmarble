package com.followfollowme.tripmarble.domainlayer.region.application.util;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionDetailResponse.BoundaryGeoJsonItem;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionDetailResponse.CoordinateGroupItem;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class GeoJsonParserUtil {

    private static final JsonFactory factory = new JsonFactory();

    public static BoundaryGeoJsonItem parse(String json) {
        if (json == null || json.isBlank())
            return null;

        String type = null;
        List<CoordinateGroupItem> coordinateGroups = new ArrayList<>();

        try (JsonParser parser = factory.createParser(new StringReader(json))) {

            // 루트 객체 탐색
            while (!parser.isClosed() && parser.nextToken() != null) {
                String fieldName = parser.currentName();
                if ("type".equals(fieldName)) {
                    parser.nextToken();
                    type = parser.getText();
                } else if ("coordinates".equals(fieldName)) {
                    parser.nextToken();
                    coordinateGroups = readCoordinates(parser, type);
                }
            }

            return BoundaryGeoJsonItem.builder()
                .type(type)
                .coordinates(coordinateGroups)
                .build();

        } catch (IOException e) {
            return null;
        }
    }

    private static List<CoordinateGroupItem> readCoordinates(JsonParser parser, String type) throws IOException {
        List<CoordinateGroupItem> groups = new ArrayList<>();

        if (!parser.isExpectedStartArrayToken())
            return groups;

        // Polygon → [ [ [x,y], [x,y], ... ] ]
        // MultiPolygon → [ [ [ [x,y], ... ] ], [ [x,y], ... ] ]
        while (parser.nextToken() != JsonToken.END_ARRAY) {
            if (parser.currentToken() == JsonToken.START_ARRAY) {
                List<List<Double>> points = readPolygonPoints(parser, type);
                if (!points.isEmpty()) {
                    points = normalizePolygonRing(points);
                }
                groups.add(CoordinateGroupItem.builder().points(points).build());
            }
        }
        return groups;
    }

    private static List<List<Double>> readPolygonPoints(JsonParser parser, String type) throws IOException {
        List<List<Double>> points = new ArrayList<>();

        // MultiPolygon의 경우 내부 중첩이 한 단계 더 깊음
        if ("MultiPolygon".equalsIgnoreCase(type)) {
            parser.nextToken(); // START_ARRAY (outer polygon)
        }

        while (parser.nextToken() != JsonToken.END_ARRAY) {
            if (parser.currentToken() == JsonToken.START_ARRAY) {
                List<Double> point = new ArrayList<>(2);
                parser.nextToken(); // X
                point.add(parser.getDoubleValue());
                parser.nextToken(); // Y
                point.add(parser.getDoubleValue());
                points.add(point);

                // 배열 닫기
                parser.nextToken(); // END_ARRAY
            }
        }

        // MultiPolygon이면 한 단계 닫기
        if ("MultiPolygon".equalsIgnoreCase(type)) {
            parser.nextToken(); // END_ARRAY
        }

        return points;
    }

    private static List<List<Double>> normalizePolygonRing(List<List<Double>> points) {
        if (points.isEmpty())
            return points;

        List<List<Double>> normalized = new ArrayList<>(points);
        List<Double> first = points.get(0);
        List<Double> last = points.get(points.size() - 1);
        if (!first.equals(last)) {
            normalized.add(new ArrayList<>(first));
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
