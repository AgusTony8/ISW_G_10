package server.tango_app_email_server.Services.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmailRequestDto {
    private String toEmail;
    private String subject;
    private EmailBodyDto body;
}
