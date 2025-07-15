package com.lmsChat.finalProjectChat.chat.repository;

import com.lmsChat.finalProjectChat.chat.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, String> {
    
    List<ChatRoom> findByCreatorId(String creatorId);
    
    ChatRoom findByChatRoomId(String chatRoomId);
    
    @Query(value = "SELECT chatRoomId, creatorId, chatRoomName, memberCount, createdAt FROM chatroom WHERE chatRoomId IN (:chatRoomIds)", nativeQuery = true)
    List<ChatRoom> findAllByChatRoomIds(@Param("chatRoomIds") List<String> chatRoomIds);
} 