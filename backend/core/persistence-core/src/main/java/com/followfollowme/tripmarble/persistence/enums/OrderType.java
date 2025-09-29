package com.followfollowme.tripmarble.persistence.enums;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum OrderType {
    ASC("오름차순"),
    DESC("내림차순");

    private final String description;
}
