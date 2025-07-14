package com.lmsChat.finalProjectChat.jwt.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TokenService {
    
    @Value("${spring.jwt.access.expired}")
    private long accessTokenExpiration;

    @Value("${spring.jwt.refresh.expired}")
    private long refreshTokenExpiration;


    



}
