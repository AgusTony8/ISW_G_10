package com.example.back_tangoApp.Services.Dtos.Response;

import com.example.back_tangoApp.Services.Dtos.PedidoData.DadorDeCargaResponseDto;
import com.example.back_tangoApp.Services.Dtos.PedidoData.DomicilioResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;

@Data
@AllArgsConstructor
public class PedidoPostResponseDto {
    private Integer idPedido;
    private String tipoDeCarga;
    private DadorDeCargaResponseDto dadorDeCarga;
    private String fechaRetiro;
    private String fechaEntrega;
    private DomicilioResponseDto domicilioRetiro;
    private DomicilioResponseDto domicilioEntrega;
    private ArrayList<String> urlImagenes;
    private ArrayList<String> transportistasANotificar;
}
