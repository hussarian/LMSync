package com.lmsChat.finalProjectChat.user.controller;

import com.lmsChat.finalProjectChat.user.dto.UserSearchResponse;
import com.lmsChat.finalProjectChat.user.entity.User;
import com.lmsChat.finalProjectChat.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/chat/users")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;
    
    @GetMapping("/search")
    public ResponseEntity<UserSearchResponse> searchUsers(
            @RequestParam(value = "q", required = false) String query,
            @RequestParam(value = "type", required = false) String type) {
        
        List<User> users = userService.searchUsers(query, type);
        
        List<UserSearchResponse.UserDto> userDtos = users.stream()
                .map(UserSearchResponse.UserDto::from)
                .collect(Collectors.toList());
        
        UserSearchResponse response = UserSearchResponse.builder()
                .success(true)
                .users(userDtos)
                .build();
        
        return ResponseEntity.ok(response);
    }
} 