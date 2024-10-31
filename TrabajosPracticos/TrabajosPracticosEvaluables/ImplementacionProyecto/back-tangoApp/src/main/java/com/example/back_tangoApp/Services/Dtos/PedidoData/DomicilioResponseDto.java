package com.example.back_tangoApp.Services.Dtos.PedidoData;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class DomicilioResponseDto {
    private String provincia;
    private String localidad;
    private String calle;
    private Integer numero;
    private String referencia;
}
