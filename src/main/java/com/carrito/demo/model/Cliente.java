package com.carrito.demo.model;


import com.carrito.demo.model.administration.Usuario;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
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
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombreCliente;
    private String dni;
    private String telefono;
    private LocalDate fechaCompra;
    private double montoTotal;

    @ManyToOne
    // @JsonManagedReference // accion cuando se serializa el vendedor
    private Usuario vendedor;

    @OneToMany(cascade = CascadeType.ALL)
    private List<CarritoItem> itemsComprados = new ArrayList<>();

}

