package com.example.back_tangoApp.Services.Dtos.Request;

import com.example.back_tangoApp.Services.Dtos.PedidoData.DomicilioRequestDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;

@AllArgsConstructor
@Data
public class PedidoRequest {
    private Integer tipoDeCarga;
    private DomicilioRequestDto domicilioRetiro;
    private DomicilioRequestDto domicilioEntrega;
    private LocalDate fechaRetiro;
    private LocalDate fechaEntrega;
    private ArrayList<String> urlImagenes;
    private Integer dadorDeCarga;
}
