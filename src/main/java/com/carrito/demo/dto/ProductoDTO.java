package com.carrito.demo.dto;

import lombok.Data;

@Data
public class ProductoDTO {
    private Long id;
    private String nombre;
    private double precio;
    private int stock;
}
