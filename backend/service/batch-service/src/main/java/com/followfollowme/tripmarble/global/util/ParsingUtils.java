package com.followfollowme.tripmarble.global.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public final class ParsingUtils {

    private static final DateTimeFormatter DEFAULT_DATE_TIME_FORMATTER =
        DateTimeFormatter.ofPattern("yyyyMMddHHmmss");

    private static final Pattern PHONE_PATTERN = Pattern.compile("(\\d{2,4}-\\d{3,4}-\\d{4})");

    private ParsingUtils() {
    }

    // Null-safe + 기본값 적용
    public static int toInteger(String value) {
        return toIntegerOrDefault(value, 0);
    }

    public static int toIntegerOrDefault(String value, int defaultValue) {
        try {
            return (value != null) ? Integer.parseInt(value) : defaultValue;
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }

    public static long toLong(String value) {
        return toLongOrDefault(value, 0L);
    }

    public static long toLongOrDefault(String value, long defaultValue) {
        try {
            return (value != null) ? Long.parseLong(value) : defaultValue;
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }

    public static double toDouble(String value) {
        return toDoubleOrDefault(value, 0.0);
    }

    public static double toDoubleOrDefault(String value, double defaultValue) {
        try {
            return (value != null) ? Double.parseDouble(value) : defaultValue;
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }

    public static LocalDateTime toLocalDateTime(String value) {
        return toLocalDateTime(value, DEFAULT_DATE_TIME_FORMATTER);
    }

    public static LocalDateTime toLocalDateTime(String value, DateTimeFormatter formatter) {
        try {
            return (value != null) ? LocalDateTime.parse(value, formatter) : null;
        } catch (Exception e) {
            return null;
        }
    }

    public static String extractPhone(String rawTel) {
        if (rawTel == null) return null;
        Matcher matcher = PHONE_PATTERN.matcher(rawTel);
        List<String> phones = new ArrayList<>();
        while (matcher.find()) {
            phones.add(matcher.group(1));
        }
        return phones.isEmpty() ? null : String.join(", ", phones);
    }
}
