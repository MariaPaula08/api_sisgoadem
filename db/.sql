/*GRUPO 1*/
CREATE DATABASE IF NOT EXISTS sisgoadem;
USE sisgoadem;
CREATE TABLE inventario(
    id_inventario INT(11) PRIMARY KEY,
    nombre VARCHAR(45) DEFAULT NULL,
    cantidad_en_stock VARCHAR(45) DEFAULT NULL,
    fecha_reposicion VARCHAR(45)DEFAULT NULL,
    id_proveedores INT(11)DEFAULT NULL
);

INSERT INTO inventario VALUES 
(1, 'Carne', '100', '2023-09-11', 101);

CREATE TABLE proveedores(
    id_proveedores INT(11) PRIMARY KEY,
    id_materiaPrima INT(11)DEFAULT NULL,
    nombre VARCHAR(45) DEFAULT NULL,
    contacto VARCHAR(45) DEFAULT NULL,
    empresa VARCHAR(45) DEFAULT NULL,
    correo VARCHAR(45) DEFAULT NULL,
    direccion VARCHAR(45) DEFAULT NULL,
    total_productos VARCHAR(45) DEFAULT NULL,
    historial_compras VARCHAR(100) DEFAULT NULL,
    id_inventario INT(11)DEFAULT NULL
);
 
INSERT INTO proveedores VALUES 
(1, 101, 'Juan Pérez', '320247852', 'Empresa A', 'juan@example.com', 'Calle Principal 123', '50', 'Compra 1, Compra 2', 201);


CREATE TABLE materiaPrima(
    id_materiaPrima INT(11) PRIMARY KEY,
    nombre VARCHAR(45) DEFAULT NULL,
    descripcion VARCHAR(500) DEFAULT NULL,
    precio_unitario VARCHAR(45) DEFAULT NULL,
    cantidad_insumo VARCHAR(45) DEFAULT NULL,
    categoria VARCHAR(45) DEFAULT NULL,
    ingredientes VARCHAR(200) DEFAULT NULL,
    producto_imagen VARCHAR(45) DEFAULT NULL,
    id_ventas INT(11)DEFAULT NULL
);

INSERT INTO materiaPrima VALUES 
(1, 'Lentejas', 'Descripción de Materia Prima A', '10.99', '100 kg', 'Categoría 1', 'Ingrediente 1, Ingrediente 2', 'imagen1.jpg', 301);



CREATE TABLE usuarios(
    id_usuarios INT(11) PRIMARY KEY,
    nombre_usuario VARCHAR(45) DEFAULT NULL,
    numero_identificacion INT(20) DEFAULT NULL,
    contraseña VARCHAR(45) DEFAULT NULL,
    nivel_acceso VARCHAR(45) DEFAULT NULL,
    fechaRegistro VARCHAR(45) DEFAULT NULL,
    fecha_hora_apertura VARCHAR(50) DEFAULT NULL,
    fecha_hora_cierre VARCHAR(50) DEFAULT NULL,
    saldo_inicial VARCHAR(45) DEFAULT NULL,
    saldo_final VARCHAR(45) DEFAULT NULL,
    venta_totales VARCHAR(45) DEFAULT NULL,
    fecha_contratacion VARCHAR(40) DEFAULT NULL,
    horario VARCHAR(70) DEFAULT NULL,
    salario VARCHAR(45) DEFAULT NULL,
    contacto VARCHAR(35) DEFAULT NULL,
    fechaHoraReserva VARCHAR(70) DEFAULT NULL,
    numComensales VARCHAR(45) DEFAULT NULL,
    mesa VARCHAR(40) DEFAULT NULL,
    id_mesas INT(11) DEFAULT NULL
);

INSERT INTO usuarios VALUES 
(1, 'Usuario1', 1234567890, 'contraseña1', 'Nivel1', '2023-09-11', '2023-09-11 08:00:00', '2023-09-11 16:00:00', '100.00', '150.00', '500.00', '2023-08-01', 'Lunes a Viernes 9 AM - 5 PM', '2000.00', 'usuario1@example.com', '2023-09-12 19:00:00', '4', 'Mesa 1', 101);



CREATE TABLE venta(
    id_venta INT(11) DEFAULT NULL,
    fechaVenta VARCHAR(45) DEFAULT NULL,
    Cajero VARCHAR(45) DEFAULT NULL,
    totalVenta VARCHAR(45) DEFAULT NULL,
    metodoPago VARCHAR (50) DEFAULT NULL,
    mesa VARCHAR(45) DEFAULT NULL,
    productos_vendidos VARCHAR(100) DEFAULT NULL,
    cantidad INT(20) DEFAULT NULL,
    precio_unitario VARCHAR(50) DEFAULT NULL,
    id_usuarios INT(11) DEFAULT NULL,
    id_mesa INT(11) DEFAULT NULL,
    id_facturacion INT (11) DEFAULT NULL
);
INSERT INTO venta VALUES 
(1, '2023-09-11', 'Cajero1', '100.00', 'Tarjeta', 'Mesa 1', 'Producto A, Producto B', 5, '20.00', 101, 201, 301);


CREATE TABLE mesa(
    id_mesa INT(11) PRIMARY KEY,
    numeroMesa VARCHAR(45) DEFAULT NULL,
    capacidad VARCHAR(50) DEFAULT NULL,
    estado VARCHAR(50) DEFAULT NULL
);
INSERT INTO mesa VALUES 
(1, 'Mesa 1', '4 personas', 'Disponible');


CREATE TABLE facturacion (
    id_facturacion INT(11) PRIMARY KEY,
    hora VARCHAR(45) DEFAULT NULL,
    fecha VARCHAR(45) DEFAULT NULL,
    platos VARCHAR(70) DEFAULT NULL,
    bebidas VARCHAR(40) DEFAULT NULL,
    cantidad_platos VARCHAR(20) DEFAULT NULL,
    valor_unitario VARCHAR(30) DEFAULT NULL,
    valor_total VARCHAR(30) DEFAULT NULL,
    fecha_pedido VARCHAR(45) DEFAULT NULL,
    hora_solicitud VARCHAR(45) DEFAULT NULL,
    estado_pedido VARCHAR(50) DEFAULT NULL,
    notas_adicionales VARCHAR(50) DEFAULT NULL,
    id_mesa INT(11) DEFAULT NULL,
    id_categoria INT(11) DEFAULT NULL,
    id_caja INT(11) DEFAULT NULL
);

INSERT INTO facturacion VALUES 
(1, '12:30 PM', '2023-09-11', 'Plato A, Plato B', 'Bebida X', '2, 3', '15.00, 10.00', '50.00', '2023-09-11', '12:00 PM', 'En preparación', 'Sin cebolla', 101, 201, 301);


CREATE TABLE transacciones(
    id_transacciones INT(11) PRIMARY KEY,
    fecha_hora_transaccion VARCHAR(100) DEFAULT NULL,
    tipo_transaccion VARCHAR(50) DEFAULT NULL,
    descripcion_transaccion VARCHAR(200) DEFAULT NULL,
    nombre_cuenta VARCHAR(50) DEFAULT NULL,
    tipo_cuenta VARCHAR(50) DEFAULT NULL,
    saldo_actual VARCHAR(50) DEFAULT NULL,
    fuente_ingresos VARCHAR(50) DEFAULT NULL,
    monto_ingreso VARCHAR(50) DEFAULT NULL,
    id_caja INT(11) DEFAULT NULL
);

INSERT INTO transacciones VALUES 
(1, '2023-09-11 14:30:00', 'Venta', 'Venta de productos', 'Caja 1', 'Caja', '500.00', 'Ingresos por ventas', '100.00', 101);


CREATE TABLE caja(
    id_caja INT(11) PRIMARY KEY,
    nombre_plato VARCHAR(50) DEFAULT NULL,
    precio VARCHAR(50) DEFAULT NULL,
    tipo_pago VARCHAR(50) DEFAULT NULL,
    id_facturacion INT(11) DEFAULT NULL,
    id_gastos INT(11) DEFAULT NULL
);

INSERT INTO caja VALUES 
(1, 'Patakolo', '$35.000', 'Tarjeta', 101, 201);


CREATE TABLE gastos(
    id_gastos INT(11) PRIMARY KEY,
    tipo_gastos VARCHAR(50) DEFAULT NULL,
    fecha VARCHAR(40) DEFAULT NULL,
    monto VARCHAR(50) DEFAULT NULL,
    descripcion VARCHAR(200) DEFAULT NULL,
    fecha_reporte VARCHAR(45) DEFAULT NULL,
    resumen_ingresos_totales VARCHAR(100) DEFAULT NULL,
    resumen_gastos_totales VARCHAR(100) DEFAULT NULL,
    ganancias_netas VARCHAR(100) DEFAULT NULL,
    otros_indicadores VARCHAR(200) DEFAULT NULL
);

INSERT INTO gastos VALUES 
(1, 'Compra de suministros', '2023-09-11', '50.00', 'Compra de productos de limpieza', '2023-09-11', 'Ingresos totales: 500.00', 'Gastos totales: 50.00', 'Ganancias netas: 450.00', 'Ninguno');


CREATE TABLE categoria(
    id_categoria INT(11) PRIMARY KEY,
    nombre_plato VARCHAR(50) DEFAULT NULL,
    descripcion VARCHAR(40) DEFAULT NULL,
    precio VARCHAR(50) DEFAULT NULL,
    tipo_plato VARCHAR(200) DEFAULT NULL,
    ingredientes VARCHAR(45) DEFAULT NULL,
    categoria_imagen VARCHAR(100) DEFAULT NULL
);

INSERT INTO categoria VALUES 
(1, 'Plato A', 'Descripción del Plato A', '15.99', 'Plato Principal', 'Ingrediente 1, Ingrediente 2', 'imagen1.jpg');



