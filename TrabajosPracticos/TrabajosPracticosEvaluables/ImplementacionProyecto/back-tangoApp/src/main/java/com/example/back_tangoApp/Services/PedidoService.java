package com.example.back_tangoApp.Services;

import com.example.back_tangoApp.Entities.DadorDeCarga;
import com.example.back_tangoApp.Entities.Pedido;
import com.example.back_tangoApp.Entities.TipoCarga;
import com.example.back_tangoApp.Repositories.PedidoRepository;
import com.example.back_tangoApp.Services.Dtos.Request.EmailBodyDto;
import com.example.back_tangoApp.Services.Dtos.Request.EmailRequestDto;
import com.example.back_tangoApp.Services.Dtos.Request.PedidoRequest;
import com.example.back_tangoApp.Services.Dtos.Response.PedidoPostResponseDto;
import com.example.back_tangoApp.Services.Dtos.Response.PedidoResponseDto;
import com.example.back_tangoApp.Services.Mappers.PedidoMapper;
import com.example.back_tangoApp.WebClients.WebClientEmailSender;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

import java.util.Optional;

@Service
@AllArgsConstructor
public class PedidoService {

    private final PedidoRepository pedidoRepository;

    private final TipoCargaService tipoCargaService;

    private final DadorDeCargaService dadorDeCargaService;

    private final ImagenService imagenService;

    private final TransportistasService transportistasService;

    private final WebClientEmailSender webClientEmailSender;

    private final PedidoMapper pedidoMapper;

    public PedidoPostResponseDto addPedido(PedidoRequest pedidoRequest) {
        TipoCarga tipoCarga = this.tipoCargaService.getById(Long.valueOf(pedidoRequest.getTipoDeCarga()));

        DadorDeCarga dadorDeCarga = this.dadorDeCargaService.
                getById(Long.valueOf(pedidoRequest.getDadorDeCarga()));

        Pedido pedido = this.pedidoMapper.PedidoRequestToEntity(pedidoRequest, tipoCarga, dadorDeCarga);

        this.savePedido(pedido);

        this.imagenService.addImagenes(pedidoRequest.getUrlImagenes(), pedido);

        this.sendEmailDadores(pedido);

        ArrayList<String> transportistas = transportistasService.getNameTransportisasByLocalidadId(pedido.getIdLocalidadR());
        Pedido pedido1 = this.pedidoById(pedido.getNum_pedidos());
        return pedidoMapper.PedidoEntityToPostDto(pedido1, transportistas);
    }

    public PedidoResponseDto getPedidoById(Long id) {
        Pedido pedido = this.pedidoById(id);
        return pedidoMapper.PedidoEntityToDto(pedido);
    }

    public ArrayList<Pedido> getPedidosDador(Long idDador) {
        Optional<ArrayList<Pedido>> pedidosDador = this.pedidoRepository.findByDadorDeCargaIdDador(idDador);
        return pedidosDador.get();
    }

    private void savePedido(Pedido pedido) {
        this.pedidoRepository.saveAndFlush(pedido);
    }


    private Pedido pedidoById(Long id) {
        Optional<Pedido> pedido = this.pedidoRepository.findById(id);
        if (pedido.isEmpty()) {
            throw new EntityNotFoundException("Pedido no encontrado");
        }
        return pedido.get();
    }

    private void sendEmailDadores(Pedido pedido) {

        ArrayList<String> emailsTransportistasLocalidadR = transportistasService.getEmailTransportistasByLocalidadId(
                pedido.getIdLocalidadR()
        );

        String toEmail = String.join(", ", emailsTransportistasLocalidadR);
        EmailBodyDto emailBodyDto = pedidoMapper.createEmailBody(pedido);
        String subject = "Nuevo pedido en tu localidad!";

        EmailRequestDto emailRequestDto = new EmailRequestDto(
                toEmail,
                subject,
                emailBodyDto
        );
        webClientEmailSender.sendEmail(emailRequestDto).subscribe(
                response -> System.out.println("Email enviado exitosamente: " + response),
                error -> System.out.println("Error al enviar el email: " + error.getMessage())
        );
    }
}
