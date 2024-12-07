package com.carrito.demo.repository;

import com.carrito.demo.model.administration.Rol;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolRepository extends JpaRepository<Rol, Long> {
    Rol findByNombre(String nombre);
}
