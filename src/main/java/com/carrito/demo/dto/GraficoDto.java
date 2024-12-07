package com.carrito.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GraficoDto {
    private LocalDate fecha;
    private Integer cantidad;
}
