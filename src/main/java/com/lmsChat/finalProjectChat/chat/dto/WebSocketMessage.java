package com.lmsChat.finalProjectChat.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WebSocketMessage {
    private String type;
    private String roomId;
    private MessageDto message;
    
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
        
        public static MessageDto from(SendMessageResponse.MessageDto messageDto) {
            return MessageDto.builder()
                    .id(messageDto.getId())
                    .content(messageDto.getContent())
                    .sender(SenderDto.from(messageDto.getSender()))
                    .time(messageDto.getTime())
                    .type(messageDto.getType())
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
        
        public static SenderDto from(SendMessageResponse.SenderDto senderDto) {
            return SenderDto.builder()
                    .id(senderDto.getId())
                    .name(senderDto.getName())
                    .build();
        }
    }
} 