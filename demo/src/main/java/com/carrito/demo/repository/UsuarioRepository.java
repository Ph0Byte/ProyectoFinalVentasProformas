package com.carrito.demo.repository;

import com.carrito.demo.model.administration.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByUsername(String nombre);

}
