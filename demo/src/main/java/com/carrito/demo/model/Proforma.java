package com.carrito.demo.model;

import com.carrito.demo.model.administration.Usuario;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class Proforma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fecha;
    private double total;

    @ManyToOne
    private ClienteProforma clienteProforma;

    @ManyToOne
    private Usuario vendedor;

    @OneToMany(cascade = CascadeType.ALL)
    private List<CarritoItem> items;

}
