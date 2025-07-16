package com.ict.finalProject.lmsPermission.permission.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ict.finalProject.lmsPermission.permission.auth.dto.UsersDto;

@Service
public class UsersServiceImpl implements UserService {

    @Override
    public List<UsersDto> getUsersByRole(String role) {
        return null;
    }
}
