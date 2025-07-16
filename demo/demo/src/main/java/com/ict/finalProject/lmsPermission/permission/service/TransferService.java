package com.ict.finalProject.lmsPermission.permission.service;

import java.util.List;

import com.ict.finalProject.lmsPermission.permission.auth.dto.TransferDto;

public interface TransferService {
    List<TransferDto> getByMemberId(String memberId);
    List<TransferDto> updatePermissions(String memberId, List<TransferDto> perms);
} 