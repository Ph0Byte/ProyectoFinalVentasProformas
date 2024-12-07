package com.carrito.demo.dto.login;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterDTO {
    private String username;
    private String password;
    private String rolNombre; // "ADMIN" o "USER"
}
