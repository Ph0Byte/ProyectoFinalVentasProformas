package com.carrito.demo.service.login;

import com.carrito.demo.exception.RecursoNoEncontradoExepcion;
import com.carrito.demo.model.administration.Rol;
import com.carrito.demo.model.administration.Usuario;
import com.carrito.demo.repository.RolRepository;
import com.carrito.demo.repository.UsuarioRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.security.auth.login.LoginException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RolService rolService;

    private Map<String, Integer> codigosRecuperacion = new HashMap<>();

    @PostConstruct
    public void initRole() {
        rolService.crearRolSiNoExiste("ADMIN");
        rolService.crearRolSiNoExiste("USER");
    }

    public Usuario obtenerUsuarioPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExepcion("Usuario no encontrado"));
    }

    public Usuario registrarUsuario(String username, String password, String rolName) throws LoginException {
        if (usuarioRepository.findByUsername(username) != null) {
            throw new LoginException("El nombre de usuario ya existe: " + username);
        }

        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setUsername(username);
        nuevoUsuario.setPassword(password);

        Rol rol = rolService.obtenerRolPorNombre(rolName);
        nuevoUsuario.setRol(rol);

        return usuarioRepository.save(nuevoUsuario);
    }

    public Usuario loginLogearse(String username, String password) throws LoginException {
        Usuario user = usuarioRepository.findByUsername(username);
        if (user == null || !password.equals(user.getPassword())) {
            throw new LoginException("Usuario o contraseña incorrecta");
        }
        return user;
    }

    public void iniciarRecuperacionCuenta(String username) throws Exception {
        Usuario usuario = usuarioRepository.findByUsername(username);
        if (usuario == null) {
            throw new Exception("No se encontró la cuenta");
        }

        int codigo = new Random().nextInt(9000) + 1000;
        codigosRecuperacion.put(username, codigo);
        // Enviar el código de recuperación por email
        System.out.println("Código de recuperación para " + username + ": " + codigo);
    }

    public boolean cambiarContraseña(String username, String nuevoPassword, int codigo) throws Exception {
        Usuario usuario = usuarioRepository.findByUsername(username);
        if (usuario == null) {
            throw new Exception("Usuario no encontrado");
        }

        Integer codigoCorrecto = codigosRecuperacion.get(username);
        if (codigoCorrecto == null || codigoCorrecto != codigo) {
            return false;
        }

        usuario.setPassword(nuevoPassword);
        usuarioRepository.save(usuario);
        codigosRecuperacion.remove(username); // Eliminamos el código después de ser usado

        return true;
    }

    public List<Usuario> obtenerTodosUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario actualizarUsuario(Long id, Usuario usuarioDetalles) {
        Usuario usuario = obtenerUsuarioPorId(id);
        usuario.setUsername(usuarioDetalles.getUsername());
        usuario.setPassword(usuarioDetalles.getPassword());
        usuario.setRol(usuarioDetalles.getRol());
        return usuarioRepository.save(usuario);
    }

    public void eliminarUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }
}
