package com.carrito.demo.dto.login;

import lombok.Data;

@Data
public class ChangePasswordDTO {
    private String username;
    private String nuevoPassword;
    private int codigoRecuperacion;
}
