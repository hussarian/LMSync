package com.lmsChat.finalProjectChat.auth.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RoleType {
    ROLE_ADMIN("ROLE_ADMIN"),
    ROLE_ORGANIZATION("ROLE_ORGANIZATION"),
    ROLE_USER("ROLE_USER"),
    ROLE_TEACHER("ROLE_TEACHER");

    private final String role;

}
