package com.lmsChat.finalProjectChat.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomsResponse {
    private boolean success;
    private List<ChatRoomResponse> rooms;
} 