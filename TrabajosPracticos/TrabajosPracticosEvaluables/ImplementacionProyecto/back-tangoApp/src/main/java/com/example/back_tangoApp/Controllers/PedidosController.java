package com.example.back_tangoApp.Controllers;

import com.example.back_tangoApp.Entities.Pedido;
import com.example.back_tangoApp.Services.Dtos.PedidoRequest;
import com.example.back_tangoApp.Services.PedidoService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/pedidos")
@AllArgsConstructor
public class PedidosController {
    private PedidoService pedidoService;


    @PostMapping("/registrar")
    public ResponseEntity<Pedido> registrarPedido(@RequestBody PedidoRequest pedidoRequest) {
        try {
            Pedido result = this.pedidoService.addPedido(pedidoRequest);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .header("error-message", e.getMessage())
                    .build();
        }
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<Pedido> buscarPedido(@PathVariable Long id) {
        try {
            Pedido result = this.pedidoService.getPedidoById(id);
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