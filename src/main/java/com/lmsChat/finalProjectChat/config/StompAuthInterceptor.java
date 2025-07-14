package com.lmsChat.finalProjectChat.config;

import java.util.Collections;
import java.util.List;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;

import com.lmsChat.finalProjectChat.jwt.utils.JwtUtil;
import com.lmsChat.finalProjectChat.jwt.utils.TokenUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

@Component
@RequiredArgsConstructor
@Slf4j
public class StompAuthInterceptor implements ChannelInterceptor{
    private final TokenUtils jwtTokenProvider;
    private final JwtUtil jwtUtil;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        log.info("WebSocket message: {}", message);
        if (accessor != null && StompCommand.CONNECT.equals(accessor.getCommand())) {
            List<String> authorization = accessor.getNativeHeader("Authorization");
            log.info("WebSocket Authorization: {}", authorization);

            if (authorization != null && !authorization.isEmpty()) {
                String token = authorization.get(0).replace("Bearer ", "");

                if (jwtTokenProvider.isAccessTokenValid(token)) {
                    String userId = jwtUtil.getUserId(token);
                    log.info("WebSocket connected user: {}", userId);

                    Authentication auth = new UsernamePasswordAuthenticationToken(
                            userId,
                            null,
                            Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
                    );

                    SecurityContextHolder.getContext().setAuthentication(auth);
                    accessor.setUser(auth);
                } else {
                    log.info("Invalid JWT token in WebSocket connection");
                }
            }
        }

        return message;
    }
    
}
