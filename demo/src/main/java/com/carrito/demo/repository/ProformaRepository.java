package com.carrito.demo.repository;

import com.carrito.demo.model.Proforma;
import com.carrito.demo.model.administration.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProformaRepository extends JpaRepository<Proforma, Long> {
    List<Proforma> findByVendedorId(Long dendedorId);

    List<Proforma> findByVendedor(Usuario vendedor);
}
