package com.example.back_tangoApp.WebClients;

import com.example.back_tangoApp.Services.Dtos.EmailDto;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
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

    public Mono<String> sendEmail(EmailDto emailDto) {
        return webClient
                .post()
                .uri(uriBuilder ->
                    uriBuilder
                            .path("/email-server/send/testEmail")
                            .build()
                )
                .bodyValue(emailDto)
                .retrieve()
                .bodyToMono(String.class)
                .doOnError(e -> System.out.println("Error al enviar el email"));
    }
}
