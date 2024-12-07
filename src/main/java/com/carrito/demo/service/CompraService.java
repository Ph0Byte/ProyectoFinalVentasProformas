package com.carrito.demo.service;

import com.carrito.demo.dto.GraficoDto;
import com.carrito.demo.model.Compra;
import com.carrito.demo.repository.ClienteProformaRepository;
import com.carrito.demo.repository.CompraRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class CompraService {
    // este seriio se encarag de hacer los graficos
    @Autowired
    private CompraRepository compraRepository;

    @Autowired
    private ClienteProformaRepository proformaRepository;

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


    public List<GraficoDto> graficoContarPorFechaProformas() {
        List<Object[]> proformas = proformaRepository.contarProformasPorFecha();
        List<GraficoDto> grafico = new ArrayList<>();
        proformas.forEach(o-> {
            LocalDate fecha = (LocalDate) o[1];
            Integer cantidad = ((Number) o[0]).intValue();
            grafico.add(new GraficoDto(fecha, cantidad));
        });
        return grafico;
    }
}
