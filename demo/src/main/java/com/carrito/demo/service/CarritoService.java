package com.carrito.demo.service;


import com.carrito.demo.exception.RecursoNoEncontradoExepcion;
import com.carrito.demo.model.Carrito;
import com.carrito.demo.model.CarritoItem;
import com.carrito.demo.model.Cliente;
import com.carrito.demo.model.Producto;
import com.carrito.demo.model.administration.Usuario;
import com.carrito.demo.repository.*;
import com.carrito.demo.service.login.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class CarritoService {

    @Autowired
    private CarritoRepository carritoRepository;
    @Autowired
    private ProductoRepository productoRepository;
    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private UsuarioService usuarioService;

    public Carrito agregarProducto(
            Long carritoId, Long productoId, int catidad, Long vendedorId){
        Usuario vendedor = usuarioService.obtenerUsuarioPorId(vendedorId);

        Carrito carrito = carritoRepository.findById(carritoId)
                .orElseThrow(() -> new RecursoNoEncontradoExepcion("Carrito no encontrado"));

        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(()-> new RecursoNoEncontradoExepcion("Producto no encontrado"));

        if (producto.getStock() < catidad){
            throw new IllegalArgumentException("Stock insuficiente para el producto" + producto.getNombre());
        }

        producto.setStock(producto.getStock() - catidad); // reduce stock

        CarritoItem item = new CarritoItem();
        item.setProducto(producto);
        item.setCantidad(catidad);
        carrito.getItems().add(item);
        // calculo del cosot totoal de la compra
        carrito.setTotal(carrito.getTotal() + producto.getPrecio()*catidad);

        productoRepository.save(producto);
        return carritoRepository.save(carrito);
    }

    public Carrito crearNuevoCarrito(){
        Carrito carrito = new Carrito();
        carrito.setTotal(0);
        return carritoRepository.save(carrito);
    }

    public void  vaciarCarrito(Long carritoId){
        Carrito carrito = carritoRepository.findById(carritoId)
                .orElseThrow(() -> new RecursoNoEncontradoExepcion("Carrito no encontrado"));

        carrito.getItems().clear();
        carrito.setTotal(0);
        carritoRepository.save(carrito);
    }

    public List<Producto> buscarProducto(String nombre){
        return productoRepository.findByNombreContainingIgnoreCase(nombre);
    }

    public Carrito editarProductoCantidadCarrito(
            Long carritoId, Long productoId , int nuevaCantidad){
        Carrito carrito = carritoRepository.findById(carritoId)
                .orElseThrow(()-> new RecursoNoEncontradoExepcion("Carrito no encontrado "));

        CarritoItem item = carrito.getItems().stream()
                .filter(i-> i.getProducto().getId().equals(productoId))
                .findFirst()
                .orElseThrow(() -> new RecursoNoEncontradoExepcion("Producto no encontrado en el carrito"));

        int diferencia = nuevaCantidad - item.getCantidad();

        Producto producto = item.getProducto();
        if (producto.getStock() < diferencia){
            throw new IllegalArgumentException("Stock insuficiente");
        }
        producto.setStock(producto.getStock() - diferencia);
        item.setCantidad(nuevaCantidad);

        // recalcular total del carrito
        recalcularTotal(carrito);

        productoRepository.save(producto);
        return  carritoRepository.save(carrito);
    }


    public Carrito eliminarProductoCarrito(Long carritoId, Long productoId){
        Carrito carrito = carritoRepository.findById(carritoId)
                .orElseThrow(()-> new RecursoNoEncontradoExepcion("Carrito no encontrado"));

        CarritoItem item = carrito.getItems().stream()
                .filter(i -> i.getProducto().getId().equals(productoId))
                .findFirst()
                .orElseThrow(() -> new RecursoNoEncontradoExepcion("Producto no encontrado "));

        Producto producto = item.getProducto();
        producto.setStock(producto.getStock() + item.getCantidad());

        carrito.getItems().remove(item);
        recalcularTotal(carrito);

        productoRepository.save(producto);
        return  carritoRepository.save(carrito);
    }

    // comprar y registrar en el historial
    public Cliente procesarCompra(Long carritoId, Cliente cliente){
        Carrito carrito = carritoRepository.findById(carritoId)
                .orElseThrow(()-> new RecursoNoEncontradoExepcion("Carrito no encotnrado"));

        // validar stock
        for (CarritoItem item: carrito.getItems()){
            Producto producto = item.getProducto();
            if (producto.getStock() < item.getCantidad()){
                throw new IllegalArgumentException("Stock insuficente para el producto " + producto.getNombre());
            }
        }

        // descontar stock y registrar la compra

        cliente.setFechaCompra(LocalDate.now());
        cliente.setMontoTotal(carrito.getTotal());
        cliente.setItemsComprados(new ArrayList<>(carrito.getItems()));

        for (CarritoItem item : carrito.getItems()){
            Producto producto = item.getProducto();
            producto.setStock(producto.getStock()-item.getCantidad());
            productoRepository.save(producto);
        }

        // guardar el cliente y vaciar el carrito
        carrito.getItems().clear();
        carrito.setTotal(0);
        carritoRepository.save(carrito);
        return clienteRepository.save(cliente);
    }

    public Cliente procesarCompra(Long carritoId, Cliente cliente, Long vendedorId) {
        Carrito carrito = carritoRepository.findById(carritoId)
                .orElseThrow(() -> new RecursoNoEncontradoExepcion("Carrito no encontrado"));

        // Validar stock de los productos en el carrito
        for (CarritoItem item : carrito.getItems()) {
            Producto producto = item.getProducto();
            if (producto.getStock() < item.getCantidad()) {
                throw new IllegalArgumentException("Stock insuficiente para el producto " + producto.getNombre());
            }
        }

        // Obtener el vendedor
        Usuario vendedor = usuarioService.obtenerUsuarioPorId(vendedorId);
        if (vendedor == null) {
            throw new RecursoNoEncontradoExepcion("Vendedor no encontrado");
        }

        // Registrar la compra en el cliente
        cliente.setFechaCompra(LocalDate.now());
        cliente.setMontoTotal(carrito.getTotal());
        cliente.setItemsComprados(new ArrayList<>(carrito.getItems()));
        cliente.setVendedor(vendedor);

        // Descontar stock
        for (CarritoItem item : carrito.getItems()) {
            Producto producto = item.getProducto();
            producto.setStock(producto.getStock() - item.getCantidad());
            productoRepository.save(producto);
        }

        // Vaciar el carrito después de procesar la compra
        carrito.getItems().clear();
        carrito.setTotal(0);
        carritoRepository.save(carrito);

        // Guardar el cliente en el historial de compras
        return clienteRepository.save(cliente);
    }

    //

    public void recalcularTotal(Carrito carrito){
        double total = carrito.getItems().stream()
                .mapToDouble(item-> item.getProducto().getPrecio()
                        * item.getCantidad()).sum();
        carrito.setTotal(total);
    }

}
