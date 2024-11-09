package com.carrito.demo.service;

import com.carrito.demo.model.Compra;
import com.carrito.demo.repository.CompraRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class CompraService {
    @Autowired
    private CompraRepository compraRepository;

    public List<Compra> obtenerRegistroCompras(){
        return compraRepository.findAll();
    }

    // accion de los graficos en el dashboard
    public Map<String, Integer> obtenerVentasPorDia(){
        List<Objects[]> ventaPorDia = compraRepository.countVentasByDiaSemana();
        Map<String, Integer> ventasDias = new HashMap<>();
        String[] dias = {"Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"};

        for (Object [] resultado : ventaPorDia){
            int diaIndex = ((Number) resultado[0]).intValue() - 1;
            int cantidadVentas = ((Number) resultado[1]).intValue();
            ventasDias.put(dias[diaIndex], cantidadVentas);
        }
        return ventasDias;
    }
}
