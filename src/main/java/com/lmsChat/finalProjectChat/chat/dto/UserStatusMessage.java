package com.lmsChat.finalProjectChat.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserStatusMessage {
    private String type; // "user_joined" 또는 "user_left"
    private String roomId;
    private String userId;
    private String userName;
} 