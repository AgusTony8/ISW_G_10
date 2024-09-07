package com.example.back_tangoApp.Controllers;

import com.example.back_tangoApp.Entities.Pedido;
import com.example.back_tangoApp.Services.Dtos.PedidoRequest;
import com.example.back_tangoApp.Services.PedidoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pedidos")
@AllArgsConstructor
public class PedidosController {
    private PedidoService pedidoService;


    @PostMapping("/registrar")
    public ResponseEntity<Pedido> registrarPedido(@RequestBody PedidoRequest pedidoRequest) {
        Pedido result = this.pedidoService.addPedido(pedidoRequest);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<Pedido> buscarPedido(@PathVariable Long id) {
        Pedido result = this.pedidoService.getPedidoById(id);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }




}
