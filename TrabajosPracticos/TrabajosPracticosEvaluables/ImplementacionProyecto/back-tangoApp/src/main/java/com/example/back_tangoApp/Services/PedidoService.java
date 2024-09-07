package com.example.back_tangoApp.Services;

import com.example.back_tangoApp.Entities.DadorDeCarga;
import com.example.back_tangoApp.Entities.Imagen;
import com.example.back_tangoApp.Entities.Pedido;
import com.example.back_tangoApp.Entities.TipoCarga;
import com.example.back_tangoApp.Repositories.DadorRespository;
import com.example.back_tangoApp.Repositories.PedidoRepository;
import com.example.back_tangoApp.Services.Dtos.PedidoRequest;
import com.example.back_tangoApp.Services.Mappers.PedidoPostToEntityMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.expression.spel.ast.OpDec;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PedidoService {

    private final PedidoRepository pedidoRepository;

    private final TipoCargaService tipoCargaService;

    private final DadorDeCargaService dadorDeCargaService;

    private final PedidoPostToEntityMapper pedidoPostToEntityMapper;

    private final ImagenService imagenService;

    public Pedido addPedido(PedidoRequest pedidoRequest) {
        TipoCarga tipoCarga = this.tipoCargaService.getById(Long.valueOf(pedidoRequest.getTipoDeCarga()));

        DadorDeCarga dadorDeCarga = this.dadorDeCargaService.
                getById(Long.valueOf(pedidoRequest.getDadorDeCarga()));

        Optional<Pedido> pedido = Optional.of(
                pedidoPostToEntityMapper.apply(pedidoRequest, dadorDeCarga, tipoCarga)
        );

        this.savePedido(pedido.get());

        this.imagenService.addImagenes(pedidoRequest.getUrlImagenes(), pedido.get());

        Pedido pedidoSaved = this.getPedidoById(pedido.get().getNum_pedidos());

        return pedidoSaved;
    }

    public Pedido getPedidoById(Long id) {
        Optional<Pedido> pedido = this.pedidoRepository.findById(id);
        if (pedido.isEmpty())  {
            throw new EntityNotFoundException("Pedido no encontrado");
        };
        return pedido.get();
    }

    private void savePedido(Pedido pedido) {
        this.pedidoRepository.saveAndFlush(pedido);
    }
}
