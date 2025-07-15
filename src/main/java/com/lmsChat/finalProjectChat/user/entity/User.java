package com.lmsChat.finalProjectChat.user.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String userId;
    
    private String name;
    
    private String email;
    
    @Enumerated(EnumType.STRING)
    private UserType type;
    
    public enum UserType {
        STUDENT, TEACHER, ADMIN
    }
} 