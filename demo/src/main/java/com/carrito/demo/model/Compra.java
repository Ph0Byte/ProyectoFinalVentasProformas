package com.carrito.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Compra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombreCliente;
    private String dni;
    private String telefono;
    private LocalDate fechaCompra;
    private double montoTotal;

    @OneToMany(cascade = CascadeType.ALL)
    private List<CarritoItem> itemsComprados = new ArrayList<>();
}
