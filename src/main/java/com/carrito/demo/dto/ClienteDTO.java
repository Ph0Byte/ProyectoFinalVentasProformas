package com.carrito.demo.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ClienteDTO {
    private Long id;
    private String nombreCliente;
    private String dni;
    private String telefono;
    private LocalDate fechaCompra;
    private Double montoTotal;
    private VendedorDTO vendedor;
}
