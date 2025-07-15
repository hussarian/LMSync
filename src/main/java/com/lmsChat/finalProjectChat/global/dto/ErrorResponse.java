package com.lmsChat.finalProjectChat.global.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {
    private boolean success;
    private String error;
    
    public static ErrorResponse of(String error) {
        return ErrorResponse.builder()
                .success(false)
                .error(error)
                .build();
    }
} 