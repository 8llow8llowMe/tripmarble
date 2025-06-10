package com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.batch.dto.RegionItem;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.batch.dto.SigunguItem;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.RegionJdbcPort;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

@Component
@RequiredArgsConstructor
public class RegionJdbcAdapter implements RegionJdbcPort {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void batchInsertRegions(List<RegionItem> regionItems) {
        String sql = "INSERT INTO region(region_code, region_name) VALUES (?, ?)";

        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                RegionItem regionItem = regionItems.get(i);
                ps.setString(1, regionItem.regionCode());
                ps.setString(2, regionItem.regionName());
            }

            @Override
            public int getBatchSize() {
                return regionItems.size();
            }
        });
    }

    @Override
    public void batchInsertSigungus(List<SigunguItem> sigunguItems) {
        // 1. regionCode 목록 추출
        Set<String> regionCodes = new HashSet<>();
        for (SigunguItem item : sigunguItems) {
            regionCodes.add(item.regionCode());
        }

        // 2. regionCode -> regionId 매핑
        Map<String, Long> regionCodeToIdMap = fetchRegionIdMap(regionCodes);

        // 3. INSERT 수행
        String sql = "INSERT INTO sigungu(region_id, sigungu_code, sigungu_name) VALUES (?, ?, ?)";

        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                SigunguItem item = sigunguItems.get(i);
                Long regionId = regionCodeToIdMap.get(item.regionCode());

                if (regionId == null) {
                    throw new IllegalStateException("regionCode [" + item.regionCode() + "]에 대한 region_id를 찾을 수 없습니다.");
                }

                ps.setLong(1, regionId);
                ps.setString(2, item.sigunguCode());
                ps.setString(3, item.sigunguName());
            }

            @Override
            public int getBatchSize() {
                return sigunguItems.size();
            }
        });
    }

    private Map<String, Long> fetchRegionIdMap(Set<String> regionCodes) {
        if (regionCodes.isEmpty()) return Collections.emptyMap();

        String placeholders = String.join(",", Collections.nCopies(regionCodes.size(), "?"));
        String sql = "SELECT region_code, id FROM region WHERE region_code IN (" + placeholders + ")";

        List<Map.Entry<String, Long>> results = jdbcTemplate.query(
            sql,
            regionCodes.toArray(),
            regionRowMapper()
        );

        Map<String, Long> map = new HashMap<>();
        for (Map.Entry<String, Long> entry : results) {
            map.put(entry.getKey(), entry.getValue());
        }

        return map;
    }

    private RowMapper<Map.Entry<String, Long>> regionRowMapper() {
        return (ResultSet rs, int rowNum) -> new AbstractMap.SimpleEntry<>(
            rs.getString("region_code"),
            rs.getLong("id")
        );
    }
}
