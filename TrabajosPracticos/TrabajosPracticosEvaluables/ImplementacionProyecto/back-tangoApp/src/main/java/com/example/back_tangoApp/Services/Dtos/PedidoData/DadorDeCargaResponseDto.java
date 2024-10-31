package com.example.back_tangoApp.Services.Dtos.PedidoData;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class DadorDeCargaResponseDto {
    private String nombre;
    private String apellido;
    private String sexo;
    private String nroDocumento;
}
