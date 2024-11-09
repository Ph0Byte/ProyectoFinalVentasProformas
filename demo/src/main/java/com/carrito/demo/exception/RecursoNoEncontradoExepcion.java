package com.carrito.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class RecursoNoEncontradoExepcion extends RuntimeException {

    public RecursoNoEncontradoExepcion(String mensaje){
        super(mensaje);

    }
}