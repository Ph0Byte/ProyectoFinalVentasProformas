package com.carrito.demo.service;

import com.carrito.demo.exception.RecursoNoEncontradoExepcion;
import com.carrito.demo.model.CarritoItem;
import com.carrito.demo.model.ClienteProforma;
import com.carrito.demo.model.Producto;
import com.carrito.demo.model.Proforma;
import com.carrito.demo.model.administration.Usuario;
import com.carrito.demo.repository.ClienteProformaRepository;
import com.carrito.demo.repository.ProductoRepository;
import com.carrito.demo.repository.ProformaRepository;
import com.carrito.demo.service.login.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoField;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProformaService {

    @Autowired
    private ProformaRepository proformaRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private ClienteProformaRepository clienteProformaRepository;

    public Proforma agregarProductoAProforma(Long proformaId, Long productoId, int cantidad, Long vendedorId) {
        Usuario vendedor = usuarioService.obtenerUsuarioPorId(vendedorId);
        if (vendedor == null) {
            throw new RecursoNoEncontradoExepcion("Vendedor no encontrado con ID: " + vendedorId);
        }

        Proforma proforma = obtenerProformaPorId(proformaId);

        if (proforma.getVendedor() == null) {
            proforma.setVendedor(vendedor);
        }

        Producto producto = obtenerProductoPorId(productoId);
        CarritoItem item = new CarritoItem();
        item.setProducto(producto);
        item.setCantidad(cantidad);
        proforma.getItems().add(item);

        recalcularTotal(proforma);

        return proformaRepository.save(proforma);
    }

    public void vaciarCarritoProforma(Long proformaId) {
        Proforma proforma = obtenerProformaPorId(proformaId);

        proforma.getItems().clear();
        proforma.setTotal(0);
        proformaRepository.save(proforma);
    }

    public List<Producto> buscarProductosProformas(String nombre) {
        return productoRepository.findByNombreContainingIgnoreCase(nombre);
    }

    public Proforma editarCantidadProductoProforma(Long proformaId, Long productoId, int nuevaCantidad) {
        Proforma proforma = obtenerProformaPorId(proformaId);

        CarritoItem item = proforma.getItems().stream()
                .filter(i -> i.getProducto().getId().equals(productoId))
                .findFirst()
                .orElseThrow(() -> new RecursoNoEncontradoExepcion("Producto no encontrado en la proforma"));

        item.setCantidad(nuevaCantidad);

        recalcularTotal(proforma);

        return proformaRepository.save(proforma);
    }

    public Proforma eliminarProductoProforma(Long proformaId, Long productoId) {
        Proforma proforma = obtenerProformaPorId(proformaId);

        CarritoItem item = proforma.getItems().stream()
                .filter(i -> i.getProducto().getId().equals(productoId))
                .findFirst()
                .orElseThrow(() -> new RecursoNoEncontradoExepcion("Producto no encontrado en la proforma"));

        proforma.getItems().remove(item);
        recalcularTotal(proforma);

        return proformaRepository.save(proforma);
    }

    public ClienteProforma procesarProforma(
            Long proformaId, ClienteProforma clienteProforma, Long vendedorId) {
        Proforma proforma = obtenerProformaPorId(proformaId);
        Usuario vendedor = usuarioService.obtenerUsuarioPorId(vendedorId);

        if (vendedor == null) {
            throw new RecursoNoEncontradoExepcion("Vendedor no encontrado con ID: " + vendedorId);
        }

        clienteProforma.setFechaProforma(LocalDate.now());
        clienteProforma.setMontoTotal(proforma.getTotal());
        clienteProforma.setItemsProformas(new ArrayList<>(proforma.getItems()));
        clienteProforma.setVendedor(vendedor); 

        proforma.getItems().clear();
        proforma.setTotal(0);
        proformaRepository.save(proforma);

        return clienteProformaRepository.save(clienteProforma);
    }

    public Proforma crearNuevaProforma(Long vendedorId) {
        Usuario vendedor = usuarioService.obtenerUsuarioPorId(vendedorId);
        if (vendedor == null) {
            throw new RecursoNoEncontradoExepcion("Vendedor no encontrado con ID: " + vendedorId);
        }

        Proforma proforma = new Proforma();
        proforma.setVendedor(vendedor);
        proforma.setTotal(0);
        return proformaRepository.save(proforma);
    }

    public Map<Integer, Long> contarProformasPorSemana(Long vendedorId) {
        Usuario vendedor = usuarioService.obtenerUsuarioPorId(vendedorId);
        List<Proforma> proformas = proformaRepository.findByVendedor(vendedor);

        return proformas.stream()
                .collect(Collectors.groupingBy(
                        proforma -> proforma.getFecha().get(ChronoField.ALIGNED_WEEK_OF_YEAR),
                        Collectors.counting()
                ));
    }

    public List<ClienteProforma> obtenerProformasPorVendedor(Long vendedorId) {
        Usuario vendedor = usuarioService.obtenerUsuarioPorId(vendedorId);
        return clienteProformaRepository.findByVendedor(vendedor);
    }

    public List<ClienteProforma> obtenerTodasProformasClientes() {
        return clienteProformaRepository.findAll();
    }

    public ClienteProforma obtenerClienteDeProformaPorId(Long clienteProformaId) {
        return clienteProformaRepository.findById(clienteProformaId)
                .orElseThrow(() -> new RecursoNoEncontradoExepcion("Cliente no encontrado con ID: " + clienteProformaId));
    }

    private Proforma obtenerProformaPorId(Long proformaId) {
        return proformaRepository.findById(proformaId)
                .orElseThrow(() -> new RecursoNoEncontradoExepcion("Proforma no encontrada"));
    }

    private Producto obtenerProductoPorId(Long productoId) {
        return productoRepository.findById(productoId)
                .orElseThrow(() -> new RecursoNoEncontradoExepcion("Producto no encontrado"));
    }

    private void recalcularTotal(Proforma proforma) {
        double total = proforma.getItems().stream()
                .mapToDouble(item -> item.getProducto().getPrecio() * item.getCantidad())
                .sum();
        proforma.setTotal(total);
    }
}
