package com.carrito.demo.controller;

import com.carrito.demo.model.Producto;
import com.carrito.demo.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productos")
@CrossOrigin(origins = "*")
public class ProductoController {
    @Autowired
    private ProductoService productoService;

    @GetMapping("/buscar")
    public ResponseEntity<List<Producto>> buscarProductos(@RequestParam String nombre){
        List<Producto> productos = productoService.buscarProductoPorNombre(nombre);
        return  ResponseEntity.ok(productos);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Producto>> obtenerTodosProductos(){
        List<Producto> listaProductos = productoService.obtenerTodosProductos();
        return ResponseEntity.ok(listaProductos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerProductoPorId(@PathVariable Long id){
        Producto producto = productoService.obtenerProductoPorId(id);
        if (producto != null){
            return ResponseEntity.ok(producto);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @PostMapping("/agregar")
    public ResponseEntity<Producto> agregarProducto(@RequestBody Producto producto) {
        Producto nuevoProducto = productoService.agregarNuevoProducto(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoProducto);
    }


    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Producto> actualizarProducto(
            @PathVariable Long id, @RequestBody Producto producto){
        Producto productoActualizado = productoService.actualizarProducto(id, producto);
        if (productoActualizado != null){
            return ResponseEntity.ok(productoActualizado);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id){
        productoService.eliminarProducto(id);
        return  ResponseEntity.noContent().build();
    }
}
