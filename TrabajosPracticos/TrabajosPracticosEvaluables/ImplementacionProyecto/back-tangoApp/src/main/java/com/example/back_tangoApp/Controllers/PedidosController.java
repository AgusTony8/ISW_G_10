package com.example.back_tangoApp.Controllers;

import com.example.back_tangoApp.Entities.Pedido;
import com.example.back_tangoApp.Services.Dtos.Request.PedidoRequest;
import com.example.back_tangoApp.Services.Dtos.Response.PedidoPostResponseDto;
import com.example.back_tangoApp.Services.Dtos.Response.PedidoResponseDto;
import com.example.back_tangoApp.Services.PedidoService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeParseException;
import java.util.ArrayList;

@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = "http://localhost:3000") // Permite solicitudes desde http://localhost:3000
@AllArgsConstructor
public class PedidosController {
    private PedidoService pedidoService;


    @PostMapping("/registrar")
    public ResponseEntity<PedidoPostResponseDto> registrarPedido(@RequestBody PedidoRequest pedidoRequest) {
        try {
            System.out.println(pedidoRequest);
            PedidoPostResponseDto result = this.pedidoService.addPedido(pedidoRequest);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .header("error-message", e.getMessage())
                    .build();
        } catch (DateTimeParseException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .header("error-message", "Se espera fecha en formato dd/mm/aaaa")
                    .build();
        }
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<PedidoResponseDto> buscarPedido(@PathVariable Long id) {
        try {
            PedidoResponseDto result = this.pedidoService.getPedidoById(id);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .header("error-message", e.getMessage())
                    .build();
        }
    }

    @GetMapping("/pedidosDador")
    public ResponseEntity<ArrayList<Pedido>> pedidosDador(@RequestParam Long idDador) {
        ArrayList<Pedido> result = this.pedidoService.getPedidosDador(idDador);
        if (result.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .header("error-message", "No se encontraron pedidos para el dador")
                    .body(result);
        }
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
