package com.ict.finalProject.lmsPermission.permission.service;

import java.util.List;

import com.ict.finalProject.lmsPermission.permission.auth.dto.PermissionManagementDto;

public interface PermissionService {
    List<PermissionManagementDto> getAll();
    PermissionManagementDto createPermission(PermissionManagementDto dto);
} 