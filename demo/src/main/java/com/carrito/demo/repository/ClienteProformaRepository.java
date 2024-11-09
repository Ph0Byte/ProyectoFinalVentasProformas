package com.carrito.demo.repository;

import com.carrito.demo.model.ClienteProforma;
import com.carrito.demo.model.administration.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClienteProformaRepository extends JpaRepository<ClienteProforma, Long> {
    List<ClienteProforma> findByVendedorId(Long vendedorId);
    List<ClienteProforma> findByVendedor(Usuario vendedor);

}
