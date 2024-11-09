package com.carrito.demo.model;

import com.carrito.demo.model.administration.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class ClienteProforma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fechaProforma;
    private String nombreCliente;
    private String dni;
    private String telefono;

    private double montoTotal;

    @ManyToOne
    private Usuario vendedor;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CarritoItem> itemsProformas;


}
