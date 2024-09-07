package com.example.back_tangoApp.Services.Mappers;

import com.example.back_tangoApp.Entities.DadorDeCarga;
import com.example.back_tangoApp.Entities.Pedido;
import com.example.back_tangoApp.Entities.TipoCarga;
import com.example.back_tangoApp.Services.Dtos.PedidoRequest;
import com.example.back_tangoApp.Services.TriFunction;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PedidoPostToEntityMapper implements TriFunction<PedidoRequest, DadorDeCarga, TipoCarga, Pedido> {

    @Override
    public Pedido apply(PedidoRequest pedidoRequest, DadorDeCarga dadorDeCarga, TipoCarga tipoCarga) {
        return new Pedido(
                pedidoRequest,
                tipoCarga,
                dadorDeCarga
        );
    }
}
