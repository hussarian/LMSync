package com.ict.finalProject.lmsPermission.permission.service;

import java.util.List;

import com.ict.finalProject.lmsPermission.permission.auth.dto.UsersDto;

public interface UserService {
    List<UsersDto> getUsersByRole(String role);
}
