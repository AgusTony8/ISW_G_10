package com.example.back_tangoApp.Services.Mappers;

import com.example.back_tangoApp.Entities.Imagen;
import com.example.back_tangoApp.Entities.Pedido;
import com.example.back_tangoApp.Services.Dtos.PedidoData.DadorDeCargaResponseDto;
import com.example.back_tangoApp.Services.Dtos.PedidoData.DomicilioResponseDto;
import com.example.back_tangoApp.Services.Dtos.Response.PedidoResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class PedidoMapper {

    public PedidoResponseDto PedidoEntityToDto(Pedido pedidoEntity) {
        return new PedidoResponseDto(
                Math.toIntExact(pedidoEntity.getNum_pedidos()),
                pedidoEntity.getTipoDeCarga().getNombre(),
                new DadorDeCargaResponseDto(
                        pedidoEntity.getDadorDeCarga().getNombre(),
                        pedidoEntity.getDadorDeCarga().getApellido()
                ),
                pedidoEntity.getFecRetiro(),
                pedidoEntity.getFecEntrega(),
                new DomicilioResponseDto(
                        pedidoEntity.getProvincia(),
                        pedidoEntity.getLocalidadR(),
                        pedidoEntity.getCalleR(),
                        pedidoEntity.getNumeroCalleR(),
                        pedidoEntity.getReferenciaR()
                ),
                new DomicilioResponseDto(
                        pedidoEntity.getProvinciaE(),
                        pedidoEntity.getLocalidadE(),
                        pedidoEntity.getCalleE(),
                        pedidoEntity.getNumeroCalleE(),
                        pedidoEntity.getReferenciaE()

                ),
                (ArrayList<String>) pedidoEntity.getImagenes().stream().map(
                        Imagen::getLink).collect(Collectors.toList())
        );
    }

}
