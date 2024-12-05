# Proyecto Sistema de Ventas y Proformas - KeaGamers

El **Sistema de Ventas y Proformas** ha sido desarrollado para mejorar el proceso de ventas y generación de proformas en la tienda KeaGamers, especializada en equipos tecnológicos. Con este sistema, se automatizan las cotizaciones y compras, generando reportes en formato PDF de manera eficiente.

## Beneficios
- Optimización del proceso de ventas y cotizaciones.
- Generación automática de reportes en formato PDF.
- Integración de un sistema amigable para gestionar inventarios y clientes.
- Facilita la personalización de proformas y el seguimiento de ventas.

## Tecnologías Usadas
- **Backend**: Java 21, Spring Boot, MySQL.
- **Frontend**: React, JavaScript.

## Requerimientos Técnicos
- **Java**: Versión 21 o superior.
- **Node.js**: Versión 18 o superior.
- **MySQL**: Instalado y configurado correctamente.



# GUIA DE INSTALACION 
1. ejecutar el siguiente comando en la terminal o descargar el ZIP

       git clone https://github.com/Ph0Byte/ProyectoFinalVentasProformas.git
2. Descomprimir o abrir

       directorios
        /demo/ (back end - hecho con spring  )
        /vista/ (front end - hecho en react )

3. Abre las carpetas utilizando un editor de código como IntelliJ IDEA (para el backend) o VSCode (para el frontend).

### configuracion del back end 
1. Edita el archivo de configuración en "application.properties"
   
3.  configuracion de la base de datos (back end)

        spring.datasource.url=jdbc:mysql://localhost:3306/nombre_base_datos
        spring.datasource.username=usuario
        spring.datasource.password=contraseña

4. ejecute el programa en el archivos "DemoAplication.java" y con eso todo deberia de esta corriendo correctamente
   en caso de error verifique el el puerto 8080 este libre y si periste cambie el puerto de salida en "application.properties"

        server.port:8083

## Comandos de instalacion (front end)
1. Abra la carpeta en el editor de su preferencia y ejecute los siguiente comandos 

- 1 instalacion de paquetes :
  
       npm install

- 2 correr el programa :

      npm run dev


## Entornos recomendados 
- intellij
- xamp
- vscode 
