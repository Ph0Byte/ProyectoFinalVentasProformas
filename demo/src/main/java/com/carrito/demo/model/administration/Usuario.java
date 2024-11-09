package com.carrito.demo.model.administration;

import com.carrito.demo.model.Cliente;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;


    @ManyToOne
    private Rol rol;

    @OneToMany(mappedBy = "vendedor")
    @JsonBackReference // evuta que vuelva a llamr al cliente
    private List<Cliente> clientes;
}
