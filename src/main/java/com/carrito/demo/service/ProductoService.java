package com.carrito.demo.service;

import com.carrito.demo.model.Producto;
import com.carrito.demo.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {
    @Autowired
    private ProductoRepository productoRepository;

    public List<Producto> obtenerTodosProductos(){
        return productoRepository.findAll();
    }

    public Producto obtenerProductoPorId(Long id){
        return productoRepository.findById(id).orElse(null);
    }

    // guardar producto
    public Producto agregarNuevoProducto(Producto producto){
        try {
            Producto newProducto = new Producto();
            if (newProducto.getStock() <0){
                throw new IllegalArgumentException("El stock no puede ser negativo");
            }
        }catch (Exception e){
            throw new IllegalArgumentException("El stock no puede ser negativo");
        }
        return productoRepository.save(producto);
    }

    public Producto actualizarProducto( Long id,  Producto productoActualizado){
        Optional<Producto> productoExistente = productoRepository.findById(id);
        if (productoExistente.isPresent()){
            Producto producto = productoExistente.get();
            producto.setNombre(productoActualizado.getNombre());
            producto.setPrecio(productoActualizado.getPrecio());
            producto.setStock(productoActualizado.getStock());

            return productoRepository.save(producto);
        }
        return null;
    }

    public void eliminarProducto(Long productoId){
        productoRepository.deleteById(productoId);
    }

    public List<Producto> buscarProductoPorNombre(String nombre){
        return productoRepository.findByNombreContainingIgnoreCase(nombre);
    }
}
