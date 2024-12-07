package com.carrito.demo.service;

import com.carrito.demo.model.Cliente;
import com.carrito.demo.model.administration.Usuario;
import com.carrito.demo.repository.ClienteRepository;
import com.carrito.demo.service.login.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.mail.MailProperties;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private UsuarioService usuarioService;

    public List<Cliente> listarClientes(){
        return clienteRepository.findAll();
    }

    // Obtener todas las proformas para un vendedor
    public List<Cliente> obtenerClientesPorVendedor(Long vendedorId){
        Usuario vendedor = usuarioService.obtenerUsuarioPorId(vendedorId);
        return clienteRepository.findByVendedor(vendedor);
    }

    // Nuevo método para obtener cliente por ID junto con sus compras
    public Optional<Cliente> obtenerClienteConCompras(Long id) {
        return clienteRepository.findById(id);
    }

    public Map<String, Integer> obtenerVentasPorDia() {
        List<Object[]> ventaPorDia = clienteRepository.countVentasByDiaSemana();
        Map<String, Integer> ventasDias = new HashMap<>();
        String[] dias = {"Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"};

        for (Object[] resultado : ventaPorDia) {
            int diaIndex = ((Number) resultado[0]).intValue() - 1;
            int cantidadVentas = ((Number) resultado[1]).intValue();
            ventasDias.put(dias[diaIndex], cantidadVentas);
        }
        return ventasDias;
    }

}
