package com.lmsChat.finalProjectChat.user.service;

import com.lmsChat.finalProjectChat.user.entity.User;
import com.lmsChat.finalProjectChat.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;
    
    public List<User> searchUsers(String query, String type) {
        if (query == null || query.trim().isEmpty()) {
            return userRepository.findAll();
        }
        
        User.UserType userType = null;
        if (type != null && !type.trim().isEmpty()) {
            try {
                userType = User.UserType.valueOf(type.toUpperCase());
            } catch (IllegalArgumentException e) {
                // 잘못된 타입이면 무시하고 전체 검색
            }
        }
        
        return userRepository.searchUsers(query.trim(), userType);
    }
} 