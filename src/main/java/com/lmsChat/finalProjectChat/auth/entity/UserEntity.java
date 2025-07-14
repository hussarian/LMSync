package com.lmsChat.finalProjectChat.auth.entity;

import com.lmsChat.finalProjectChat.auth.dto.RoleType;
import com.lmsChat.finalProjectChat.auth.dto.SignUpDTO;
import com.lmsChat.finalProjectChat.auth.dto.UserUpdateDTO;
import com.lmsChat.finalProjectChat.global.BaseEntity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@ToString(exclude = "member")
public class UserEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", columnDefinition = "char(100)")
    private String id;

    @Column(name = "password", length = 255)
    private String password;

    @Column(name = "email", length = 255)
    private String email;

    @Column(name = "phone", length = 255)
    private String phone;

    // 0 비활성 1 활성
    @Column(name = "activated", columnDefinition = "tinyint(1) default 1")
    private Boolean activated;

    @Column(name = "role", length = 255)
    @Enumerated(EnumType.STRING)
    private RoleType role;

    @Column(name = "name", length = 255)
    private String name;

    @Column(name = "provider", length = 255)
    private String provider;

    @Column(name = "device_token", columnDefinition = "longtext")
    private String deviceToken;

    @Column(name = "token_type", columnDefinition = "int(11)")
    private Integer tokenType;

    @Column(name = "advertise", columnDefinition = "int(11)")
    private Boolean advertise;

    @Column(name = "last_login")
    @Temporal(TemporalType.DATE)
    private Date lastLogin;

    @Column(name = "is_callable", length = 255)
    private String isCallable;

    @Column(name = "refresh_token", columnDefinition = "longtext")
    private String refreshToken;

    @Column(name = "google", length = 255)
    private String google;

    @Column(name = "kakao", length = 255)
    private String kakao;

    @Column(name = "apple", length = 255)
    private String apple;

    @Column(name = "facebook", length = 255)
    private String facebook;

    @Column(name = "naver", length = 255)
    private String naver;

    @Column(name = "referral_code", length = 255)
    private String referralCode;

    @Column(name = "nickname", length = 255)
    private String nickname;

    @Column(name = "image", columnDefinition = "TEXT")
    private String image;

    @Column(name = "bio", length = 255)
    private String bio;

    public static UserEntity fromDto(SignUpDTO signUpDTO) {
        return UserEntity.builder()
                .email(signUpDTO.getEmail())
                .password(signUpDTO.getPassword())
                .name(signUpDTO.getName())
                .phone(signUpDTO.getPhone())
                .provider(signUpDTO.getProvider())
                .build();
    }

    public void update(UserUpdateDTO dto) {
        setName(dto.getName());
        setNickname(dto.getNickname());
        setImage(dto.getImage());
    }

}