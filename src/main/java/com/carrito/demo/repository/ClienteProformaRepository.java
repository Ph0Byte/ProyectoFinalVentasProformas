package com.carrito.demo.repository;

import com.carrito.demo.model.ClienteProforma;
import com.carrito.demo.model.administration.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClienteProformaRepository extends JpaRepository<ClienteProforma, Long> {
    List<ClienteProforma> findByVendedorId(Long vendedorId);
    List<ClienteProforma> findByVendedor(Usuario vendedor);

    @Query("SELECT COUNT(cp) AS montoTotal ,  " +
            "cp.fechaProforma FROM ClienteProforma cp GROUP BY cp.fechaProforma " +
            "ORDER BY cp.fechaProforma")
    List<Object[]> contarProformasPorFecha();

}
