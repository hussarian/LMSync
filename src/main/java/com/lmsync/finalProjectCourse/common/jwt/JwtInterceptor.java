package com.lmsync.finalProjectCourse.common.jwt;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtInterceptor {
    private final JwtUtil jweUtil;

    public JwtInterceptor(JwtUtil jweUtil) {
        this.jweUtil = jweUtil;
    }

    
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = null;

        // 쿠키에서 token 꺼내기
        Cookie[] cookies = request.getCookies();
        if(cookies != null) {
            for(Cookie cookie : cookies) {
                if("token".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }

        if(token == null) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "토큰없음");
            return false;
        }
        try {
            String userId = jweUtil.getUserIdFromToken(token);
            request.setAttribute("userId", userId); // 토큰에서 꺼낸 userId를 request에 추가
            return true;
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "토큰 유효하지 않음");
            return false;
        }    
    }
}
