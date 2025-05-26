package com.followfollowme.tripmarble.security.common.enums;

public enum SecurityRole {
    USER, MANAGER, ADMIN;

    public static SecurityRole from(String name) {
        return SecurityRole.valueOf(name.toUpperCase());
    }
}
