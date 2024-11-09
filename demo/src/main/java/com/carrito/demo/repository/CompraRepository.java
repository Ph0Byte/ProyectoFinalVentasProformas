package com.carrito.demo.repository;

import com.carrito.demo.model.Compra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Objects;

public interface CompraRepository extends JpaRepository<Compra, Long> {

    @Query("SELECT DAYOFWEEK(c.fechaCompra) AS dia, COUNT(c) AS ventas FROM Compra c GROUP BY dia")
    List<Objects[]> countVentasByDiaSemana();
}
