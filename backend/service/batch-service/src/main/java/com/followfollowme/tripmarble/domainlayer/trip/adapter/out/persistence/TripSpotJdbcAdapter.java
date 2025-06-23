package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.batch.dto.TripSpotItem;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotJdbcPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

import static com.followfollowme.tripmarble.global.util.ParsingUtils.toDouble;
import static com.followfollowme.tripmarble.global.util.ParsingUtils.toInteger;
import static com.followfollowme.tripmarble.global.util.ParsingUtils.toLocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class TripSpotJdbcAdapter implements TripSpotJdbcPort {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void batchInsertTripSpots(List<TripSpotItem> tripSpotItems) {
        String sql = """
            INSERT INTO trip_spot (
                content_type_id, content_id, title, tel, zipcode, addr1, addr2,
                mapx, mapy, mlevel, area_code, sigungu_code, ldong_regn_cd, ldong_signgu_cd,
                cat1, cat2, cat3, lcls_systm1, lcls_systm2, lcls_systm3,
                first_image, first_image2, cpyrht_div_cd,
                created_time, modified_time
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """;

        int[] results = jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                TripSpotItem item = tripSpotItems.get(i);

                ps.setInt(1, toInteger(item.contentTypeId()));
                ps.setInt(2, toInteger(item.contentId()));
                ps.setString(3, item.title());
                ps.setString(4, item.tel());
                ps.setString(5, item.zipCode());
                ps.setString(6, item.addr1());
                ps.setString(7, item.addr2());
                ps.setDouble(8, toDouble(item.mapX()));
                ps.setDouble(9, toDouble(item.mapY()));
                ps.setInt(10, toInteger(item.mLevel()));
                ps.setInt(11, toInteger(item.areaCode()));
                ps.setInt(12, toInteger(item.sigunguCode()));
                ps.setInt(13, toInteger(item.lDongRegnCd()));
                ps.setInt(14, toInteger(item.lDongSignguCd()));
                ps.setString(15, item.cat1());
                ps.setString(16, item.cat2());
                ps.setString(17, item.cat3());
                ps.setString(18, item.lclsSystm1());
                ps.setString(19, item.lclsSystm2());
                ps.setString(20, item.lclsSystm3());
                ps.setString(21, item.firstImage());
                ps.setString(22, item.firstImage2());
                ps.setString(23, item.cpyrhtDivCd());
                ps.setObject(24, toLocalDateTime(item.createdTime()));
                ps.setObject(25, toLocalDateTime(item.modifiedTime()));
            }

            @Override
            public int getBatchSize() {
                return tripSpotItems.size();
            }
        });

        int successCount = (int) Arrays.stream(results).filter(r -> r > 0).count();
        log.info("[Batch] TripSpot 저장 완료 - 요청: {}, 성공: {}", results.length, successCount);
    }
}
