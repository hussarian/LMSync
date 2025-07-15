package com.lmsChat.finalProjectChat.chat.dto;

import com.lmsChat.finalProjectChat.chat.entity.ChatRoom;
import com.lmsChat.finalProjectChat.chat.entity.ChatMessage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomResponse {
    private String id;
    private String name;
    private String lastMessage;
    private String time;
    private Integer unread;
    private String type;
    
    public static ChatRoomResponse from(ChatRoom chatRoom, ChatMessage lastMessage) {
        String time = "";
        String lastMessageContent = "";
        
        if (lastMessage != null && lastMessage.getCreatedAt() != null) {
            time = lastMessage.getCreatedAt().format(DateTimeFormatter.ofPattern("HH:mm"));
            lastMessageContent = lastMessage.getContent();
        } else if (chatRoom.getCreatedAt() != null) {
            time = chatRoom.getCreatedAt().format(DateTimeFormatter.ofPattern("HH:mm"));
        }
        
        // 참여자 수에 따라 타입 결정
        String type = chatRoom.getMemberCount() > 2 ? "group" : "individual";
        
        return ChatRoomResponse.builder()
                .id(chatRoom.getChatRoomId())
                .name(chatRoom.getChatRoomName())
                .lastMessage(lastMessageContent)
                .time(time)
                .unread(0) // 실제 읽지 않은 메시지 수는 별도 로직으로 계산
                .type(type)
                .build();
    }
} 