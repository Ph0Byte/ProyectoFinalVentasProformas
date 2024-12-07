package com.carrito.demo.controller.admin;

import com.carrito.demo.dto.login.RegisterDTO;
import com.carrito.demo.exception.RecursoNoEncontradoExepcion;
import com.carrito.demo.model.administration.Usuario;
import com.carrito.demo.service.login.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class AdminUserController {
    // ACCIONES SOLO DEL ADMINISTRADOR

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/listar")
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        return ResponseEntity.ok(usuarioService.obtenerTodosUsuarios());
    }

    @PostMapping("/register")
    public ResponseEntity<?> registrarUsuario(
            @RequestBody RegisterDTO registerDTO){
        try {
            usuarioService.loginLogearse(registerDTO.getUsername(), registerDTO.getUsername());
            return  ResponseEntity.status(HttpStatus.CREATED).body("Usuacrio registrado correctamente");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioDetalles) {
        try {
            Usuario usuarioActualizado = usuarioService.actualizarUsuario(id, usuarioDetalles);
            return ResponseEntity.ok(usuarioActualizado);
        } catch (RecursoNoEncontradoExepcion e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable Long id) {
        usuarioService.eliminarUsuario(id);
        return ResponseEntity.ok("Usuario eliminado exitosamente.");
    }
}
