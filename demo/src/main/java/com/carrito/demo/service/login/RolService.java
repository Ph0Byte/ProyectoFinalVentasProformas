package com.carrito.demo.service.login;

import com.carrito.demo.model.administration.Rol;
import com.carrito.demo.repository.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RolService {
    @Autowired
    private RolRepository rolRepository;


    public Rol obtenerRolPorNombre(String nombre){
        return rolRepository.findByNombre(nombre);
    }

    public Rol crearRolSiNoExiste(String nombre){
        Rol rol = rolRepository.findByNombre(nombre);
        if (rol == null){
            rol = new Rol();
            rol.setNombre(nombre);
            rolRepository.save(rol);
        }
        return rol;
    }
}
