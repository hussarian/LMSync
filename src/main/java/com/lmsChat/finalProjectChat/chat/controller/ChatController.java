package com.lmsChat.finalProjectChat.chat.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @GetMapping("/test")
    public String test() {
        return new String("test");
    }
    
    
}