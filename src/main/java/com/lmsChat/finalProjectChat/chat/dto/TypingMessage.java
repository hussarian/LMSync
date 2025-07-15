package com.lmsChat.finalProjectChat.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TypingMessage {
    private String type;
    private String roomId;
    private String userId;
    private String userName;
    private boolean isTyping;
} 