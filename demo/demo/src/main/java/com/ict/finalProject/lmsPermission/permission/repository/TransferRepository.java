package com.ict.finalProject.lmsPermission.permission.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.ict.finalProject.lmsPermission.permission.auth.dto.TransferDto;

public interface TransferRepository extends JpaRepository<TransferDto, Long> {
    List<TransferDto> findByPmId(Long pmId);
} 