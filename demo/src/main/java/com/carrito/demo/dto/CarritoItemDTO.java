package com.carrito.demo.dto;

import lombok.Data;

@Data
public class CarritoItemDTO {
    private Long id;
    private Long productoId;
    private int cantidad;
}
