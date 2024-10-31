package server.tango_app_email_server.Services.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DadorResponseDto {
    private String nombre;
    private String apellido;
    private String sexo;
    private String nroDocumento;
}
