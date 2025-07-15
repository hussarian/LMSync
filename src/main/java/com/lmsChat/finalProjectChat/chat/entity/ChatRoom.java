package com.lmsChat.finalProjectChat.chat.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "chatroom")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom {
    
    @Id
    private String chatRoomId;
    
    private String creatorId;
    
    private String chatRoomName;
    
    private Integer memberCount;
    
    private LocalDateTime createdAt;
} 