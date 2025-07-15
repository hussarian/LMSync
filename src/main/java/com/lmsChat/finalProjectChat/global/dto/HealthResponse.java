package com.lmsChat.finalProjectChat.global.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HealthResponse {
    private String status; // "UP" 또는 "DOWN"
    private LocalDateTime timestamp;
    private Map<String, Object> details;
} 