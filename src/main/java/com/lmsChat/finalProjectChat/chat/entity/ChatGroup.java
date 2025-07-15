package com.lmsChat.finalProjectChat.chat.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "chatgroup")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatGroup {
    
    @Id
    private String chatGroupId;
    
    private String memberId;
    
    private String chatRoomId;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime enteredAt;
    
    private LocalDateTime exitedAt;
    
    // 외래 키 관계 설정
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chatRoomId", insertable = false, updatable = false)
    private ChatRoom chatRoom;
} 