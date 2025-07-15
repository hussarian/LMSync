package com.lmsChat.finalProjectChat.chat.dto;

import com.lmsChat.finalProjectChat.chat.entity.ChatMessage;
import com.lmsChat.finalProjectChat.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessagesResponse {
    private boolean success;
    private List<MessageDto> messages;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MessageDto {
        private String id;
        private String content;
        private SenderDto sender;
        private LocalDateTime time;
        private String type;
        
        public static MessageDto from(ChatMessage message, User sender) {
            return MessageDto.builder()
                    .id(message.getMessageId())
                    .content(message.getContent())
                    .sender(SenderDto.from(sender))
                    .time(message.getCreatedAt())
                    .type("message")
                    .build();
        }
    }
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SenderDto {
        private String id;
        private String name;
        
        public static SenderDto from(User user) {
            return SenderDto.builder()
                    .id(user.getUserId())
                    .name(user.getName())
                    .build();
        }
    }
} 