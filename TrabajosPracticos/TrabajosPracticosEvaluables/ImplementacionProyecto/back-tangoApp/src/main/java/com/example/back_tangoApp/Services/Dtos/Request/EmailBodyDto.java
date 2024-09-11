package com.example.back_tangoApp.Services.Dtos.Request;

import com.example.back_tangoApp.Services.Dtos.PedidoData.DadorDeCargaResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class EmailBodyDto {
    private String fechaRetiro;
    private String fechaEntrega;
    private DadorDeCargaResponseDto dadorDeCarga;
    private String tipoDeCarga;
}
