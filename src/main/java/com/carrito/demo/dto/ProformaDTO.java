package com.carrito.demo.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class ProformaDTO {
    private Long id;
    private LocalDate fecha;
    private double total;
    private Long clienteId;
    private Long vendedorId;
    private List<CarritoItemDTO> items;
}
