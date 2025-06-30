package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.batch.dto.TripSpotDetailItem;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotDetailJdbcPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

import static com.followfollowme.tripmarble.global.util.ParsingUtils.toInteger;

@Slf4j
@Component
@RequiredArgsConstructor
public class TripSpotDetailJdbcAdapter implements TripSpotDetailJdbcPort {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void batchInsertTripSpotDetails(List<TripSpotDetailItem> tripSpotDetailItems) {
        String sql = """
            INSERT INTO trip_spot_detail (
                content_id, homepage, overview
            ) VALUES (?, ?, ?)
            """;

        int[] results = jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                TripSpotDetailItem item = tripSpotDetailItems.get(i);

                ps.setInt(1, toInteger(item.contentId()));
                ps.setString(2, item.homepage());
                ps.setString(3, item.overview());
            }

            @Override
            public int getBatchSize() {
                return tripSpotDetailItems.size();
            }
        });

        int successCount = (int) Arrays.stream(results).filter(r -> r > 0).count();
        log.info("[Batch] TripSpotDetail 저장 완료 - 요청: {}, 성공: {}", results.length, successCount);
    }
}
