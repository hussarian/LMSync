package com.lmsync.finalProjectCourse.common;

import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

/** 기본 엔티티 클래스 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@MappedSuperclass // 이 클래스의 필드들을 상속받는 엔티티의 테이블에 포함시킴
public class BaseEntity {

    /**
     * 엔티티 생성 일시
     * 엔티티가 데이터베이스에 처음 저장될 때 자동으로 설정됩니다.
     */
    private Instant createdAt;

    /**
     * 엔티티 수정 일시
     * 엔티티가 데이터베이스에서 업데이트될 때마다 자동으로 갱신됩니다.
     */
    private Instant updatedAt;

    /**
     * 엔티티 저장 전 실행되는 메서드
     * 엔티티가 데이터베이스에 저장되기 전에 생성일시를 현재 시간으로 설정합니다.
     */
    @PrePersist
    protected void onCreate(){
        this.createdAt = Instant.now();
    }

    /**
     * 엔티티 업데이트 전 실행되는 메서드
     * 엔티티가 데이터베이스에서 업데이트되기 전에 수정일시를 현재 시간으로 설정합니다.
     */
    @PreUpdate
    protected void onUpdate(){
        this.updatedAt = Instant.now();
    }
}