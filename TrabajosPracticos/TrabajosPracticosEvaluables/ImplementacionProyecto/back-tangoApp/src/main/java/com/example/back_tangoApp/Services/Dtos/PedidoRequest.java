package com.example.back_tangoApp.Services.Dtos;

import com.example.back_tangoApp.Services.Dtos.PedidoData.Domicilio;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;

@AllArgsConstructor
@Data
public class PedidoRequest {
    private Integer tipoDeCarga;
    private Domicilio domicilioRetrio;
    private Domicilio domicilioEntrega;
    private LocalDate fechaRetiro;
    private LocalDate fechaEntrega;
    private ArrayList<String> urlImagenes;
    private Integer dadorDeCarga;
}
