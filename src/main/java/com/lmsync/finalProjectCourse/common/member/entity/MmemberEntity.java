package com.lmsync.finalProjectCourse.common.member.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** 회원 정보 엔티티 */
@Entity
@Table(name="member")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MmemberEntity {
    
    @Id
    @Column(length = 100)
    private String memberId; // 회원 ID

    @Column(length = 100)
    private String id; // 사용자 ID

    @Column(length = 100)
    private String courseId; // 강의 ID

    @Column(length = 100)
    private String educationId; // 교육과정 ID

    @Column(length = 50, nullable = false)
    private String memberName; // 회원명

    @Column(length = 20)
    private String memberPhone; // 전화번호

    @Column(length = 100, nullable = false)
    private String memberEmail; // 이메일

    @Column(length = 100)
    private String profileField; // 프로필 이미지

    @Column(length = 20)
    private String memberBirthday; // 생년월일

    @Column(length = 200)
    private String memberAddress; // 주소

    @Column(length = 20, nullable = false)
    private String memberRole; // 권한

    @Column
    private LocalDateTime memberExpired; // 만료일

}