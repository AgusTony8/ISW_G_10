package server.tango_app_email_server.Services.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Data
public class TestEmailRequestDto {

    private String toEmail;
    private String subject;
    private String body;

}
