package com.ict.finalProject.lmsPermission.permission.auth.dto;

import lombok.Value;
import lombok.Builder;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Email;
import java.time.LocalDateTime;

/**
 * users 테이블 매핑용 DTO
 */
@Value
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UsersDto {

    /**
     * PK: 사용자 ID (NOT NULL)
     */
    @NotBlank
    String id;

    /**
     * 계정 생성일시 (DATETIME)
     */
    LocalDateTime createdAt;

    /**
     * 계정 수정일시 (DATETIME, NULL 허용)
     */
    LocalDateTime updatedAt;

    /**
     * 계정 활성 여부 (TINYINT(1), NOT NULL)
     */
    @NotNull
    Boolean activated;

    /**
     * 광고 수신 동의 여부 (INT)
     */
    Boolean advertise;

    /**
     * 소셜 로그인(OAuth) 제공자별 ID (NULL 허용)
     */
    String apple;
    String facebook;
    String google;
    String kakao;
    String naver;

    /**
     * 디바이스 푸시 토큰 (NULL 허용)
     */
    String deviceToken;

    /**
     * 이메일 (VARCHAR, NULL 허용)
     */
    @Email
    String email;

    /**
     * 통화 가능 여부 (NULL 허용)
     */
    String isCallable;

    /**
     * 마지막 로그인 일시 (DATE, NULL 허용)
     */
    LocalDateTime lastLogin;

    /**
     * 이름 (NOT NULL)
     */
    @NotBlank
    String name;

    /**
     * 비밀번호 해시 (NOT NULL)
     */
    @NotBlank
    String password;

    /**
     * 휴대폰 번호 (NULL 허용)
     */
    String phone;

    /**
     * OAuth 제공자 (NULL 허용)
     */
    String provider;

    /**
     * 추천인 코드 (NULL 허용)
     */
    String referralCode;

    /**
     * 리프레시 토큰 (NULL 허용)
     */
    String refreshToken;

    /**
     * 토큰 타입 (INT, NOT NULL)
     */
    @NotNull
    Integer tokenType;

    /**
     * 별명 (NULL 허용)
     */
    String nickname;

    /**
     * 소개(한 줄) (NULL 허용)
     */
    String bio;

    /**
     * 프로필 이미지 URL 또는 데이터 (NULL 허용)
     */
    String image;

    /**
     * 사용자 역할 (VARCHAR, NOT NULL)
     */
    @NotBlank
    String role;
}

