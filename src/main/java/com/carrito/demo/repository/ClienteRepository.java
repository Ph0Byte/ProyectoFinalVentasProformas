package com.carrito.demo.repository;

import com.carrito.demo.model.Cliente;
import com.carrito.demo.model.administration.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Objects;

public interface ClienteRepository extends JpaRepository<Cliente, Long>{
    @Query("SELECT DAYOFWEEK(c.fechaCompra) AS dia, COUNT(c) AS ventas FROM Cliente c GROUP BY dia")
    List<Object[]> countVentasByDiaSemana();

    List<Cliente> findByVendedor(Usuario vendedor);

}
