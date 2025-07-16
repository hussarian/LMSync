package com.ict.finalProject.lmsPermission.permission.controller;

import com.ict.finalProject.lmsPermission.permission.auth.dto.PermissionManagementDto;
import com.ict.finalProject.lmsPermission.permission.auth.dto.TransferDto;
import com.ict.finalProject.lmsPermission.permission.service.PermissionService;
import com.ict.finalProject.lmsPermission.permission.service.TransferService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.ict.finalProject.lmsPermission.permission.service.UserService;
import java.util.List;
import com.ict.finalProject.lmsPermission.permission.auth.dto.UsersDto;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api")
public class StaffPermissionController {
    @Autowired
    private UserService userService;

    @Autowired
    private PermissionService permissionService;

    @Autowired
    private TransferService transferService;


    /**
     * 직원 목록 조회 (users 테이블의 role 컬럼이 "STAFF"인 사용자)
     */
    @GetMapping("/staff")
    public List<UsersDto> getAllStaff() {
        return userService.getUsersByRole("STAFF");
    }

    /**
     * 특정 직원의 권한 목록 조회 (transfer 테이블 사용)
     */
    @GetMapping("/staff/{userId}/permissions")
    public List<TransferDto> getStaffPermissions(@PathVariable String userId) {
        return transferService.getByMemberId(userId);
    }

    /**
     * 특정 직원의 권한 업데이트 (transfer 테이블 사용)
     */
    @PutMapping("/staff/{userId}/permissions")
    public List<TransferDto> updateStaffPermissions(
            @PathVariable String userId,
            @RequestBody List<TransferDto> perms) {
        return transferService.updatePermissions(userId, perms);
    }

    /**
     * 현재 사용자 권한 조회
     */
    @GetMapping("/me/permissions")
    public List<TransferDto> getCurrentUserPermissions(
            @AuthenticationPrincipal(expression = "username") String username) {
        return transferService.getByMemberId(username);
    }

    /**
     * 전체 권한 그룹 조회 (permissionmanagement 테이블)
     */
    @GetMapping("/permissions")
    public List<PermissionManagementDto> getAllPermissions() {
        return permissionService.getAll();
    }

    /**
     * 새 권한 그룹 생성
     */
    @PostMapping("/permissions")
    @ResponseStatus(HttpStatus.CREATED)
    public PermissionManagementDto createPermission(@RequestBody PermissionManagementDto dto) {
        return permissionService.createPermission(dto);
    }
}
