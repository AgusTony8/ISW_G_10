package com.example.back_tangoApp.Services.Dtos.Response;

import com.example.back_tangoApp.Services.Dtos.PedidoData.DadorDeCargaResponseDto;
import com.example.back_tangoApp.Services.Dtos.PedidoData.DomicilioResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;

@Data
@AllArgsConstructor
public class PedidoResponseDto {
    private Integer idPedido;
    private String tipoDeCarga;
    private DadorDeCargaResponseDto dadorDeCarga;
    private LocalDate fechaRetiro;
    private LocalDate fechaEntrega;
    private DomicilioResponseDto domicilioRetiro;
    private DomicilioResponseDto domicilioEntrega;
    private ArrayList<String> urlImagenes;
}
