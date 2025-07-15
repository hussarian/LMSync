package com.lmsChat.finalProjectChat.global.exception;

public class ChatRoomNotFoundException extends RuntimeException {
    
    public ChatRoomNotFoundException(String message) {
        super(message);
    }
    
    public static ChatRoomNotFoundException of(String roomId) {
        return new ChatRoomNotFoundException("채팅방을 찾을 수 없습니다: " + roomId);
    }
} 