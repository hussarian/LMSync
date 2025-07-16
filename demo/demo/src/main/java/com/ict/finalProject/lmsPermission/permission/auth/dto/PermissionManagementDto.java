package com.ict.finalProject.lmsPermission.permission.auth.dto;

import lombok.Value;
import lombok.Builder;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

/**
 * 권한 그룹(permissionmanagement 테이블)을 전송하기 위한 DTO
 */
@Value
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PermissionManagementDto {

    /** PK: 권한 그룹 ID */
    @NotNull
    String pmId;

    /** 권한명 */
    @NotBlank
    String permissionName;

    /** 권한 설명 */
    @NotBlank
    String permissionText;

    /** 권한 타입 */
    @NotBlank
    String type;

    /** 생성일시 */
    @NotNull
    LocalDateTime createAt;

    /** 수정일시 (선택) */
    LocalDateTime updateAt;

    /** 상위 권한 ID (선택) */
    String selfFk;
}
