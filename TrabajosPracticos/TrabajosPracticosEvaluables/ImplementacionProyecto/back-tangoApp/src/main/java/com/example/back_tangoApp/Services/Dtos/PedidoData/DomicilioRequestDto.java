package com.example.back_tangoApp.Services.Dtos.PedidoData;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class DomicilioRequestDto {
    private String provincia;
    private String idProvincia;
    private String localidad;
    private String idLocalidad;
    private String calle;
    private Integer numero;
    private String referencia;
}
