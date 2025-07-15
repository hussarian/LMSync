package com.lmsChat.finalProjectChat.chat.dto;

import com.lmsChat.finalProjectChat.chat.entity.ChatRoom;
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
public class CreateRoomResponse {
    private boolean success;
    private RoomDto room;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RoomDto {
        private String id;
        private String name;
        private String type;
        private List<ParticipantDto> participants;
        private LocalDateTime createdAt;
        
        public static RoomDto from(ChatRoom chatRoom, List<User> participants) {
            List<ParticipantDto> participantDtos = participants.stream()
                    .map(ParticipantDto::from)
                    .toList();
            
            return RoomDto.builder()
                    .id(chatRoom.getChatRoomId())
                    .name(chatRoom.getChatRoomName())
                    .type(chatRoom.getMemberCount() == 2 ? "individual" : "group")
                    .participants(participantDtos)
                    .createdAt(chatRoom.getCreatedAt())
                    .build();
        }
    }
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ParticipantDto {
        private String id;
        private String name;
        
        public static ParticipantDto from(User user) {
            return ParticipantDto.builder()
                    .id(user.getUserId())
                    .name(user.getName())
                    .build();
        }
    }
} 