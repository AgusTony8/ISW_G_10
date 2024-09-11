package server.tango_app_email_server.Controllers;


import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.tango_app_email_server.Services.Dtos.EmailRequestDto;
import server.tango_app_email_server.Services.Dtos.TestEmailRequestDto;
import server.tango_app_email_server.Services.EmailService;

@RestController
@RequestMapping("/send")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:8080")
public class EmailController {

    private EmailService emailService;

    @PostMapping("/testEmail")
    public ResponseEntity<String> sendEmail(
            @RequestBody TestEmailRequestDto testEmailRequestDto) {
        try {
            emailService.sendTestEmail(
                    testEmailRequestDto.getToEmail(),
                    testEmailRequestDto.getSubject(),
                    testEmailRequestDto.getBody());
            return ResponseEntity.status(HttpStatus.OK).body("Email enviado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al enviar el email");
        }
    }

    @PostMapping("/sendPublishPedidoEmail")
    public ResponseEntity<String> sendPublishPedidoEmail(
            @RequestBody EmailRequestDto emailRequestDto) {
        try {
            emailService.sendPublishEmail(emailRequestDto);
            return ResponseEntity.status(HttpStatus.OK).body("Email enviado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al enviar el email");
        }
    }
}
