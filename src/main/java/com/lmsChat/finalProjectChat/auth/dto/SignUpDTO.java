package com.lmsChat.finalProjectChat.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignUpDTO {

    private String email;
    private String password;
    private String name;
    private String phone;
    private String birth;
    private String provider = "local";

}
