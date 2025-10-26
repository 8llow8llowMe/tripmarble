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
            // 루트 START_OBJECT로 이동
            if (parser.nextToken() != JsonToken.START_OBJECT)
                return null;

            while (parser.nextToken() != JsonToken.END_OBJECT) {
                String fieldName = parser.currentName();
                if (fieldName == null)
                    continue;

                parser.nextToken(); // 필드 값으로 이동

                if ("type".equals(fieldName)) {
                    type = parser.getValueAsString();
                } else if ("coordinates".equals(fieldName)) {
                    coordinateGroups = readCoordinates(parser, type);
                } else {
                    // 알 수 없는 필드는 스킵
                    parser.skipChildren();
                }
            }

            if (type == null || coordinateGroups.isEmpty())
                return null;

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
        if (parser.currentToken() != JsonToken.START_ARRAY) {
            // coordinates 필드는 항상 배열이어야 한다
            return groups;
        }

        if ("Polygon".equalsIgnoreCase(type)) {
            // [ [ [x,y], ... ], [hole...], ... ]
            List<List<List<Double>>> ringsLonLat = readRings(parser);
            if (!ringsLonLat.isEmpty()) {
                List<List<Double>> outerLonLat = normalizeRing(ringsLonLat.getFirst()); // 외곽 링만 사용
                // DTO는 [lat, lon]로 반환
                groups.add(CoordinateGroupItem.builder()
                    .points(toLatLon(outerLonLat))
                    .build());
            }
        } else if ("MultiPolygon".equalsIgnoreCase(type)) {
            // [ [rings...], [rings...], ... ]
            while (parser.nextToken() != JsonToken.END_ARRAY) { // 각 polygon
                if (parser.currentToken() == JsonToken.START_ARRAY) {
                    List<List<List<Double>>> ringsLonLat = readRings(parser);
                    if (!ringsLonLat.isEmpty()) {
                        List<List<Double>> outerLonLat = normalizeRing(ringsLonLat.getFirst()); // 외곽 링만 사용
                        groups.add(CoordinateGroupItem.builder()
                            .points(toLatLon(outerLonLat))
                            .build());
                    }
                } else {
                    parser.skipChildren();
                }
            }
        } else {
            // 지원하지 않는 타입은 스킵
            parser.skipChildren();
        }

        return groups;
    }

    private static List<List<List<Double>>> readRings(JsonParser parser) throws IOException {
        List<List<List<Double>>> rings = new ArrayList<>();
        // 현재 토큰: START_ARRAY (rings 배열 시작)
        while (parser.nextToken() != JsonToken.END_ARRAY) { // 각 ring
            if (parser.currentToken() == JsonToken.START_ARRAY) {
                List<List<Double>> ring = new ArrayList<>();
                while (parser.nextToken() != JsonToken.END_ARRAY) { // 각 position
                    if (parser.currentToken() == JsonToken.START_ARRAY) {
                        parser.nextToken(); // x (lon)
                        double lon = parser.getDoubleValue();
                        parser.nextToken(); // y (lat)
                        double lat = parser.getDoubleValue();
                        // 내부는 [lon, lat]로 유지
                        ring.add(List.of(lon, lat));
                        // position 배열 닫기
                        if (parser.nextToken() != JsonToken.END_ARRAY) {
                            parser.skipChildren(); // 방어적 스킵
                        }
                    } else {
                        parser.skipChildren();
                    }
                }
                rings.add(ring);
            } else {
                parser.skipChildren();
            }
        }
        return rings;
    }

    private static List<List<Double>> normalizeRing(List<List<Double>> lonLat) {
        if (lonLat == null || lonLat.isEmpty())
            return lonLat;

        List<List<Double>> normalized = new ArrayList<>(lonLat);

        // 닫힘 보장
        List<Double> first = normalized.getFirst();
        List<Double> last = normalized.getLast();
        if (!first.equals(last)) {
            normalized.add(List.of(first.get(0), first.get(1)));
        }

        // 방향 정규화: shoelace > 0 이면 CCW (표준 2D 기준)
        double area2 = signedArea2(normalized); // 면적의 2배(부호 포함)
        if (area2 < 0) {
            // 시계(CW)이면 반시계(CCW)로 뒤집기
            // (마지막 닫힘점은 유지 위해 뒤집고 다시 닫음)
            normalized.removeLast(); // 닫힘점 제거
            Collections.reverse(normalized);
            // 다시 닫음
            List<Double> f = normalized.getFirst();
            normalized.add(List.of(f.get(0), f.get(1)));
        }
        return normalized;
    }

    private static double signedArea2(List<List<Double>> ringLonLat) {
        double sum = 0.0;
        for (int i = 0; i < ringLonLat.size() - 1; i++) {
            double x1 = ringLonLat.get(i).get(0);
            double y1 = ringLonLat.get(i).get(1);
            double x2 = ringLonLat.get(i + 1).get(0);
            double y2 = ringLonLat.get(i + 1).get(1);
            sum += (x1 * y2 - x2 * y1);
        }
        return sum;
    }

    private static List<List<Double>> toLatLon(List<List<Double>> lonLat) {
        List<List<Double>> latLon = new ArrayList<>(lonLat.size());
        for (List<Double> p : lonLat) {
            latLon.add(List.of(p.get(1), p.get(0)));
        }
        return latLon;
    }
}
