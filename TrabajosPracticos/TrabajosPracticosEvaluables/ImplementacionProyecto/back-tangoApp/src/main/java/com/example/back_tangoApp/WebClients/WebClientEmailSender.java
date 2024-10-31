package com.example.back_tangoApp.WebClients;

import com.example.back_tangoApp.Services.Dtos.Request.EmailRequestDto;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.sound.midi.Soundbank;
import java.sql.SQLOutput;

@NoArgsConstructor
@Service
public class WebClientEmailSender {

    private final String baseUrl = "http://localhost:8082";
    private final String baseUrl2 = "http://tango-app-email-server:8082";

    private final WebClient webClient = WebClient.builder()
            .baseUrl(baseUrl2)
            .build();

    public Mono<String> sendEmail(EmailRequestDto emailRequestDto) {
            return webClient
                    .post()
                    .uri(uriBuilder ->
                            uriBuilder
                                    .path("/email-server/send/sendPublishPedidoEmail")
                                    .build()
                    )
                    .bodyValue(emailRequestDto)
                    .retrieve()
                    .bodyToMono(String.class)
                    .onErrorResume(e -> {
                        System.out.println("Fallo el baseUrl primario, intentando con el alternativo...");
                        WebClient webClient2 = WebClient.builder()
                                .baseUrl(baseUrl)
                                .build();
                            return webClient2
                                .post()
                                .uri(uriBuilder ->
                                        uriBuilder
                                                .path("/email-server/send/sendPublishPedidoEmail")
                                                .build()
                                )
                                .bodyValue(emailRequestDto)
                                .retrieve()
                                .bodyToMono(String.class)
                                .doOnError(e2 -> {
                                    System.out.println("Error al enviar email");
                                });
                    });

    }
}
