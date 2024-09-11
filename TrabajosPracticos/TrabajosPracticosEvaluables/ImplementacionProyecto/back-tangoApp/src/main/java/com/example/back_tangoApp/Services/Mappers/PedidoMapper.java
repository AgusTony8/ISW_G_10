package com.example.back_tangoApp.Services.Mappers;

import com.example.back_tangoApp.Entities.DadorDeCarga;
import com.example.back_tangoApp.Entities.Imagen;
import com.example.back_tangoApp.Entities.Pedido;
import com.example.back_tangoApp.Entities.TipoCarga;
import com.example.back_tangoApp.Services.Dtos.PedidoData.DadorDeCargaResponseDto;
import com.example.back_tangoApp.Services.Dtos.PedidoData.DomicilioResponseDto;
import com.example.back_tangoApp.Services.Dtos.Request.EmailBodyDto;
import com.example.back_tangoApp.Services.Dtos.Request.PedidoRequest;
import com.example.back_tangoApp.Services.Dtos.Response.PedidoPostResponseDto;
import com.example.back_tangoApp.Services.Dtos.Response.PedidoResponseDto;
import com.example.back_tangoApp.Services.Utils.DateMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class PedidoMapper {

    public Pedido PedidoRequestToEntity(PedidoRequest pedidoRequest, TipoCarga tipoCarga, DadorDeCarga dadorDeCarga) {
        return new Pedido (
                pedidoRequest,
                tipoCarga,
                dadorDeCarga
        );
    }

    public PedidoPostResponseDto PedidoEntityToPostDto(Pedido pedidoEntity, ArrayList<String> transportistas) {
        DateMapper dateMapper = new DateMapper();
        return new PedidoPostResponseDto(
                Math.toIntExact(pedidoEntity.getNum_pedidos()),
                pedidoEntity.getTipoDeCarga().getNombre(),
                new DadorDeCargaResponseDto(
                        pedidoEntity.getDadorDeCarga().getNombre(),
                        pedidoEntity.getDadorDeCarga().getApellido(),
                        pedidoEntity.getDadorDeCarga().getSexo(),
                        pedidoEntity.getDadorDeCarga().getNroDocumento()
                ),
                dateMapper.LocalDateToString(pedidoEntity.getFecRetiro()),
                dateMapper.LocalDateToString(pedidoEntity.getFecEntrega()),
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
                        Imagen::getLink).collect(Collectors.toList()),
                transportistas
        );
    }

    public PedidoResponseDto PedidoEntityToDto(Pedido pedidoEntity) {
        DateMapper dateMapper = new DateMapper();
        return new PedidoResponseDto(
                Math.toIntExact(pedidoEntity.getNum_pedidos()),
                pedidoEntity.getTipoDeCarga().getNombre(),
                new DadorDeCargaResponseDto(
                        pedidoEntity.getDadorDeCarga().getNombre(),
                        pedidoEntity.getDadorDeCarga().getApellido(),
                        pedidoEntity.getDadorDeCarga().getSexo(),
                        pedidoEntity.getDadorDeCarga().getNroDocumento()
                ),
                dateMapper.LocalDateToString(pedidoEntity.getFecRetiro()),
                dateMapper.LocalDateToString(pedidoEntity.getFecEntrega()),
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

    public EmailBodyDto createEmailBody(Pedido pedido){
        DateMapper dateMapper = new DateMapper();
        return new EmailBodyDto(
                dateMapper.LocalDateToString(pedido.getFecRetiro()),
                dateMapper.LocalDateToString(pedido.getFecEntrega()),
                new DadorDeCargaResponseDto(
                        pedido.getDadorDeCarga().getNombre(),
                        pedido.getDadorDeCarga().getApellido(),
                        pedido.getDadorDeCarga().getSexo(),
                        pedido.getDadorDeCarga().getNroDocumento()
                ),
                pedido.getTipoDeCarga().getNombre()
        );
    }

}
