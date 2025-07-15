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
public class CreateRoomRequest {
    private String type; // "individual" 또는 "group"
    private String name;
    private List<String> participantIds;
} 