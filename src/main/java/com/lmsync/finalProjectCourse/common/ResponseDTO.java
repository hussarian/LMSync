package com.lmsync.finalProjectCourse.common;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

// API 응답의 표준 포맷을 제공하는 DTO 클래스이며, 성공 응답, 실패 응답을 공통적으로 관리할 수 있게 도와줌.
// 이 DTO는 거의 모든 API 컨트롤러에서 사용되므로 전 프로젝트의 API 응답 구조 통일에 핵심적인 역할.


@Getter
@NoArgsConstructor // 기본 생성자 생성
@AllArgsConstructor // 모든 필드를 포함한 생성자 생성
@Builder // 빌더 패턴 지원
@JsonInclude(JsonInclude.Include.NON_NULL) // JSON 변환 시 null인 필드는 제외
public class ResponseDTO<T> {

    // HTTP 결과 코드 (예: 200 성공, 400 실패 등)
    private int resultCode;

    // 응답 메시지 (성공/실패 이유 등)
    private String resultMessage;

    // 실제 응답 데이터 (제네릭으로 다양한 타입 가능)
    T data;

    // 에러 응답 생성용 정적 메서드
    public static ResponseDTO<?> createErrorResponse(int code, String message) {
        return ResponseDTO.builder()
                .resultCode(code)
                .resultMessage(message)
                .build();
    }

    // 성공 응답 생성용 정적 메서드
    public static <T> ResponseDTO<T> createSuccessResponse(String message, T data) {
        return ResponseDTO.<T>builder()
                .resultCode(200)
                .data(data)
                .resultMessage(message)
                .build();
    }
    
}
