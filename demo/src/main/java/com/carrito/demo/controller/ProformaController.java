package com.carrito.demo.controller;

import com.carrito.demo.model.ClienteProforma;
import com.carrito.demo.model.Producto;
import com.carrito.demo.model.Proforma;
import com.carrito.demo.service.ProformaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/proforma")
@CrossOrigin(origins = "*")
public class ProformaController {

    @Autowired
    private ProformaService proformaService;

    private static final Logger logger = LoggerFactory.getLogger(ProformaController.class);

    @GetMapping("/buscador")
    public ResponseEntity<List<Producto>> buscarProductos(@RequestParam String nombre) {
        List<Producto> productos = proformaService.buscarProductosProformas(nombre);
        logger.info("Productos encontrados para la proforma: {}", productos);
        return ResponseEntity.ok(productos);
    }

    // Crear nueva proforma y asociar al vendedor
    @PostMapping("/nuevo")
    public ResponseEntity<Proforma> crearNuevaProforma(@RequestBody Map<String, Long> payload) {
        Long vendedorId = payload.get("vendedorId");
        Proforma proforma = proformaService.crearNuevaProforma(vendedorId);
        return ResponseEntity.ok(proforma);
    }



    @GetMapping("/listar")
    public ResponseEntity<List<ClienteProforma>> obtenerTodoElRegistroProforma() {
        List<ClienteProforma> historialProformas = proformaService.obtenerTodasProformasClientes();
        return ResponseEntity.ok(historialProformas);
    }

    @PostMapping("/{proformaId}/agregar")
    public ResponseEntity<Proforma> agregarProducto(
            @PathVariable Long proformaId,
            @RequestParam Long productoId,
            @RequestParam int cantidad,
            @RequestParam Long vendedorId) {
        Proforma proforma = proformaService.agregarProductoAProforma
                (proformaId, productoId, cantidad, vendedorId);
        return ResponseEntity.ok(proforma);
    }

    @DeleteMapping("/{proformaId}/eliminar")
    public ResponseEntity<Proforma> eliminarProductoProforma(
            @PathVariable Long proformaId,
            @RequestParam Long productoId) {
        Proforma proforma = proformaService.eliminarProductoProforma(proformaId, productoId);
        return ResponseEntity.ok(proforma);
    }

    @PutMapping("/{proformaId}/editar")
    public ResponseEntity<Proforma> editarCantidadProductoProforma(
            @PathVariable Long proformaId,
            @RequestParam Long productoId,
            @RequestParam int nuevaCantidad) {
        Proforma proforma = proformaService.editarCantidadProductoProforma(proformaId, productoId, nuevaCantidad);
        return ResponseEntity.ok(proforma);
    }

    @DeleteMapping("/{proformaId}/vaciar")
    public ResponseEntity<Void> vaciarProforma(@PathVariable Long proformaId) {
        proformaService.vaciarCarritoProforma(proformaId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{proformaId}/procesar")
    public ResponseEntity<ClienteProforma> procesarProforma(
            @PathVariable Long proformaId,
            @RequestBody ClienteProforma clienteProforma) {
        if (clienteProforma.getVendedor() == null) {
            return ResponseEntity.badRequest().body(null);
        }

        Long vendedorId = clienteProforma.getVendedor().getId();
        ClienteProforma clienteRegistrado = proformaService.procesarProforma(proformaId, clienteProforma, vendedorId);
        return ResponseEntity.ok(clienteRegistrado);
    }


    @GetMapping("/historial")
    public ResponseEntity<List<ClienteProforma>> obtenerProformasPorVendedor(
            @RequestParam Long vendedorId) {
        List<ClienteProforma> proformas = proformaService.obtenerProformasPorVendedor(vendedorId);
        return ResponseEntity.ok(proformas);
    }

    // metodo para obtener los pdf
    @GetMapping("/imprimir/{id}")
    public ResponseEntity<ClienteProforma> imprimirProformaClientes(@PathVariable long id) {
        ClienteProforma clienteProforma = proformaService.obtenerClienteDeProformaPorId(id);
        return ResponseEntity.ok(clienteProforma);
    }

    @GetMapping("/estadisticas/{vendedorId}")
    public ResponseEntity<Map<Integer, Long>> contarProformasPorSemana(@PathVariable Long vendedorId) {
        Map<Integer, Long> proformasPorSemana = proformaService.contarProformasPorSemana(vendedorId);
        return ResponseEntity.ok(proformasPorSemana);
    }
}
