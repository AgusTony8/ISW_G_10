package com.example.back_tangoApp.Services.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmailDto {
    private String toEmail;
    private String subject;
    private String body;
}
