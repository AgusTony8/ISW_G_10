package com.example.back_tangoApp.WebClients;

import com.example.back_tangoApp.Services.Dtos.Request.EmailRequestDto;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@NoArgsConstructor
@Service
public class WebClientEmailSender {

    private final String baseUrl = "http://localhost:8082";

    private final WebClient webClient = WebClient.builder()
            .baseUrl(baseUrl)
            .build();

    public Mono<String> sendEmail(EmailRequestDto emailRequestDto) {
        return webClient
                .post()
                .uri(uriBuilder ->
                    uriBuilder
                            .path("/email-server/send/testEmail")
                            .build()
                )
                .bodyValue(emailRequestDto)
                .retrieve()
                .bodyToMono(String.class)
                .doOnError(e -> System.out.println("Error al enviar el email"));
    }
}
