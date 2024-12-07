package com.carrito.demo.controller;

import com.carrito.demo.model.Cliente;
import com.carrito.demo.service.ClienteService;
import com.carrito.demo.service.login.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cliente")
@CrossOrigin(origins = "*")// http://localhost:5173
public class ClienteController {
    @Autowired
    private ClienteService clienteService;
    
    @GetMapping("/historial")
    public ResponseEntity<List<Cliente>> listarClientesPorVendedor(
            @RequestParam(name = "vendedorId") Long vendedorId) {
        List<Cliente> clientes = clienteService.obtenerClientesPorVendedor(vendedorId);
        return ResponseEntity.ok(clientes);
    }

    @GetMapping("/{id}/compras")
    public ResponseEntity<Cliente> obtenerClienteConCompras(@PathVariable Long id) {
        return clienteService.obtenerClienteConCompras(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // MANDAR LOS DATOS PARA LAS GRAFICAS
    @GetMapping("/grafico")
    public ResponseEntity<Map<String, Integer>> obtenerVentasPorDiaGraficas(){
        Map<String, Integer> ventasPorDia = clienteService.obtenerVentasPorDia();
        return ResponseEntity.ok(ventasPorDia);
    }

}
