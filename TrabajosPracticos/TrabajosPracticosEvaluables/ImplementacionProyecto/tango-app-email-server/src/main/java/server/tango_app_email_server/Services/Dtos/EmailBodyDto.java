package server.tango_app_email_server.Services.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmailBodyDto {
    private String fechaRetiro;
    private String fechaEntrega;
    private DadorResponseDto dadorDeCarga;
    private String tipoDeCarga;
}
