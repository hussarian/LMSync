package com.ict.finalProject.lmsPermission.permission.auth.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Value;

/**
 * transfer 테이블 매핑용 DTO
 */
@Value
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TransferDto {

    /** PK: 매핑 ID */
    @NotBlank
    String tId;

    /** FK: 권한 그룹 ID (permissionmanagement.pmId) */
    @NotBlank
    String pmId;

    /** FK: 사용자 ID (users.id 혹은 memberId) */
    @NotBlank
    String memberId;

    /** 매핑 생성일시 */
    @NotNull
    LocalDateTime createAt;
}

