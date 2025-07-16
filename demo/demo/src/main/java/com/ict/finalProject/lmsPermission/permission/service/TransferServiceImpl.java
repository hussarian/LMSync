package com.ict.finalProject.lmsPermission.permission.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ict.finalProject.lmsPermission.permission.auth.dto.TransferDto;

@Service
public class TransferServiceImpl implements TransferService {

    @Override
    public List<TransferDto> getByMemberId(String memberId) {
        return null;
    }

    @Override
    public List<TransferDto> updatePermissions(String memberId, List<TransferDto> perms) {
        return null;
    }
}
