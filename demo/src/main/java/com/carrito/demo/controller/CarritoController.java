package com.carrito.demo.controller;

import com.carrito.demo.exception.RecursoNoEncontradoExepcion;
import com.carrito.demo.model.Carrito;
import com.carrito.demo.model.Cliente;
import com.carrito.demo.model.Producto;
import com.carrito.demo.service.CarritoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carrito")
@CrossOrigin(origins = "*")// http://localhost:5173
public class CarritoController {
    @Autowired
    private CarritoService carritoService;

    private static final Logger logger = LoggerFactory.getLogger(CarritoController.class);

    @GetMapping("/buscador")
    public ResponseEntity<List<Producto>> buscarProductos(@RequestParam String nombre) {
        List<Producto> productos = carritoService.buscarProducto(nombre);
        logger.info("Productos encontrados: {}", productos);
        return ResponseEntity.ok(productos);
    }

    @PostMapping("/nuevo")
    public ResponseEntity<Carrito> crearNuevoCarrito() {
        logger.info("Creando un nuevo carrito");
        Carrito carrito = carritoService.crearNuevoCarrito();
        logger.info("Carrito creado: {}", carrito);
        return ResponseEntity.ok(carrito);
    }

    @DeleteMapping("/{carritoId}/vaciar")
    public ResponseEntity<Void> vaciarCarrito(@PathVariable Long carritoId) {
        logger.info("Vaciando carrito con ID: {}", carritoId);
        carritoService.vaciarCarrito(carritoId);
        logger.info("Carrito vaciado");
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{carritoId}/agregar")
    public ResponseEntity<Carrito> agregarProducto(
            @PathVariable Long carritoId,
            @RequestParam Long productoId,
            @RequestParam int cantidad ,
            @RequestParam Long vendedorId) {
        logger.info("Agregando producto ID: {} con cantidad: {} al carrito ID: {}", productoId, cantidad, carritoId, vendedorId);
        try {
            Carrito carrito = carritoService.agregarProducto(carritoId, productoId, cantidad, vendedorId);
            logger.info("Producto agregado. Estado del carrito: {}", carrito);
            return ResponseEntity.ok(carrito);
        } catch (RecursoNoEncontradoExepcion e) {
            logger.error("Producto o carrito no encontrado: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{carritoId}/editar")
    public ResponseEntity<Carrito> editarCantidadProductosCarrito(
            @PathVariable Long carritoId,
            @RequestParam Long productoId,
            @RequestParam int nuevaCantidad) {
        logger.info("Editando cantidad de producto ID: {} a nueva cantidad: {} en el carrito ID: {}", productoId, nuevaCantidad, carritoId);
        Carrito carrito = carritoService.editarProductoCantidadCarrito(carritoId, productoId, nuevaCantidad);
        logger.info("Cantidad editada. Estado del carrito: {}", carrito);
        return ResponseEntity.ok(carrito);
    }

    @DeleteMapping("/{carritoId}/eliminar")
    public ResponseEntity<Carrito> eliminarProductoCarrito(
            @PathVariable Long carritoId,
            @RequestParam Long productoId) {
        logger.info("Eliminando producto ID: {} del carrito ID: {}", productoId, carritoId);
        Carrito carrito = carritoService.eliminarProductoCarrito(carritoId, productoId);
        logger.info("Producto eliminado. Estado del carrito: {}", carrito);
        return ResponseEntity.ok(carrito);
    }

    @PostMapping("/{carritoId}/comprar")
    public ResponseEntity<Cliente> procesarCompra(
            @PathVariable Long carritoId,
            @RequestBody Cliente cliente,
            @RequestParam Long vendedorId) {
        logger.info("Procesando compra para carrito ID: {}, cliente: {}, vendedor ID: {}", carritoId, cliente, vendedorId);
        try {
            Cliente clienteRegistrado = carritoService.procesarCompra(carritoId, cliente, vendedorId);
            logger.info("Compra procesada. Información del cliente registrado: {}", clienteRegistrado);
            return ResponseEntity.ok(clienteRegistrado);
        } catch (RecursoNoEncontradoExepcion e) {
            logger.error("Error en la compra: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

}
