package com.lmsChat.finalProjectChat.user.dto;

import com.lmsChat.finalProjectChat.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserSearchResponse {
    private boolean success;
    private List<UserDto> users;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserDto {
        private String id;
        private String name;
        private String type;
        private String email;
        
        public static UserDto from(User user) {
            return UserDto.builder()
                    .id(user.getUserId())
                    .name(user.getName())
                    .type(user.getType().name().toLowerCase())
                    .email(user.getEmail())
                    .build();
        }
    }
} 