package com.carrito.demo.controller.admin;

import com.carrito.demo.dto.login.LoginDTO;
import com.carrito.demo.dto.login.RecoverAccountDTO;
import com.carrito.demo.dto.login.RegisterDTO;
import com.carrito.demo.dto.login.ChangePasswordDTO;
import com.carrito.demo.model.administration.Usuario;
import com.carrito.demo.service.login.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.LoginException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "*")
public class LoginController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/ingresar")
    public ResponseEntity<?> loginSistema(@RequestBody LoginDTO request) {
        try {
            Usuario usuario = usuarioService.loginLogearse(request.getUsername(), request.getPassword());
            return ResponseEntity.ok(usuario);
        } catch (LoginException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registrarUsuario(@RequestBody RegisterDTO registerDTO) {
        try {
            Usuario nuevoUsuario = usuarioService.registrarUsuario(
                    registerDTO.getUsername(),
                    registerDTO.getPassword(),
                    registerDTO.getRolNombre() != null ? registerDTO.getRolNombre() : "USER"
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoUsuario);
        } catch (LoginException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/recovery")
    public ResponseEntity<?> recuperarCuenta(@RequestBody RecoverAccountDTO recoverAccountDTO) {
        try {
            usuarioService.iniciarRecuperacionCuenta(recoverAccountDTO.getUsername());
            return ResponseEntity.ok("Código de recuperación enviado.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> cambiarContraseña(@RequestBody ChangePasswordDTO changePasswordDTO) {
        try {
            boolean result = usuarioService.cambiarContraseña(changePasswordDTO.getUsername(), changePasswordDTO.getNuevoPassword(), changePasswordDTO.getCodigoRecuperacion());
            if (result) {
                return ResponseEntity.ok("Contraseña actualizada con éxito.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Código de recuperación incorrecto.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/codigo-recuperacion")
    public ResponseEntity<Map<String, Integer>> obtenerCodigoRecuperacion() {
        Map<String, Integer> mensaje = new HashMap<>();
        mensaje.put("mensaje", 123);
        return ResponseEntity.ok(mensaje);
    }
}
