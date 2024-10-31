package com.example.back_tangoApp.Services.Dtos.Request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmailRequestDto {
    private String toEmail;
    private String subject;
    private EmailBodyDto body;
}
