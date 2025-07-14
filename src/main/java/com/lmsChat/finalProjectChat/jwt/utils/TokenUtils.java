package com.lmsChat.finalProjectChat.jwt.utils;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Arrays;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class TokenUtils {

    private final JwtUtil jwtUtil;
    @Value("${app.domain}")
    private String FRONT_DOMAIN;

    @Value("${app.dev-mode}")
    private boolean IS_DEV_MODE;

    public String extractRefreshToken(Cookie[] cookies) {
        return Optional.ofNullable(cookies)
                .flatMap(cookieArray -> Arrays.stream(cookieArray)
                        .filter(cookie -> "refresh".equals(cookie.getName()))
                        .map(Cookie::getValue)
                        .findFirst())
                .orElse(null);
    }

    public void validateRefreshToken(String refreshToken) {
        if (refreshToken == null) {
            throw new JwtException("No Refresh Token");
        }

        try {
            jwtUtil.isExpired(refreshToken);
        } catch (ExpiredJwtException e) {
            throw new JwtException("Expired Refresh Token");
        }

        if (!"refresh".equals(jwtUtil.getCategory(refreshToken))) {
            throw new JwtException("Invalid Token Category");
        }
    }

    public boolean isAccessTokenValid(String accessToken) throws ExpiredJwtException {
        return !jwtUtil.isExpired(accessToken) && "access".equals(jwtUtil.getCategory(accessToken));
    }

    public Cookie createLogoutCookie() {
        Cookie cookie = new Cookie("refresh", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        return cookie;
    }

    public void addRefreshTokenCookie(HttpServletResponse response, String refreshToken) {
        response.addHeader(HttpHeaders.SET_COOKIE, createRefreshCookie(refreshToken).toString());
    }

    public ResponseCookie createRefreshCookie(String value) {
        return ResponseCookie.from("refresh", value)
                .maxAge(Duration.ofDays(1))
                .secure(true)
                .path("/")
                .httpOnly(true)
                .domain("jakdanglabs.store")
                .sameSite("None")
                .build();
    }
}