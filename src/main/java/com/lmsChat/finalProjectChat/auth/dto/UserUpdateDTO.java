package com.lmsChat.finalProjectChat.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserUpdateDTO  {

    private String name;
    private String nickname;
    private String email;
    private String image;


}
