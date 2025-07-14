package com.lmsChat.finalProjectChat.auth.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_tokens")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class UserToken {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", columnDefinition = "char(36)", nullable = false)
    private String id;

    @Column(name = "user_id", columnDefinition = "char(36)", nullable = false)
    private String userId;

    @CreationTimestamp
    @Column(name = "created_at", columnDefinition = "timestamp default current_timestamp()")
    private LocalDateTime createdAt;

    @Column(name = "expires_at", columnDefinition = "bigint(20)")
    private Long expiresAt;

    @Column(name = "user_agent", columnDefinition = "longtext")
    private String userAgent;

    @Column(name = "refresh_token", columnDefinition = "longtext")
    private String refreshToken;

    @Column(name = "is_revoked", columnDefinition = "tinyint(1) default 0")
    private Boolean isRevoked;

    @UpdateTimestamp
    @Column(name = "last_used_at", columnDefinition = "timestamp default current_timestamp() on update current_timestamp()")
    private LocalDateTime lastUsedAt;
}
