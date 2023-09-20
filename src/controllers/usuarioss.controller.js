import {pool} from "../db.js"

export const getUsuarioss = async (req, res)=>{
    try{
        const [rows] = await pool.query('SELECT * FROM usuarios')
        res.json(rows)
    } catch (error){
        return res.status(500).json({
            message:"Algo va mal"
        })
    } 
}

export const getUsuarios = async (req, res)=>{
    try{
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE id_usuarios = ?', [
            req.params.id_usuarios,
        ]);

        if(rows.length <= 0)
         return res.status(404).json({
        message: 'Usuarios no encontrado'
        });
        res.send(rows[0]);
    }catch (error){
        return res.status(500).json({
            message:'Algo va mal',
        });
    }
};

export const createUsuarioss = async(req,res) => {
    try{
        const {id_usuarios, nombre_usuario, numero_identificacion, contraseña, nivel_acceso, fechaRegistro, fecha_hora_apertura, fecha_hora_cierre, saldo_inicial, saldo_final, venta_totales, fecha_contratacion, horario, salario, contacto, fechaHoraReserva, numComensales, mesa, id_mesas} = req.body
        const [rows] = await pool.query(
            "INSERT INTO usuarios(id_usuarios, nombre_usuario, numero_identificacion, contraseña, nivel_acceso, fechaRegistro, fecha_hora_apertura, fecha_hora_cierre, saldo_inicial, saldo_final, venta_totales, fecha_contratacion, horario, salario, contacto, fechaHoraReserva, numComensales, mesa, id_mesas) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", 
            [id_usuarios, nombre_usuario, numero_identificacion, contraseña, nivel_acceso, fechaRegistro, fecha_hora_apertura, fecha_hora_cierre, saldo_inicial, saldo_final, venta_totales, fecha_contratacion, horario, salario, contacto, fechaHoraReserva, numComensales, mesa, id_mesas]
        );
    res.send({
        id_usuarios: rows.insertId,
        nombre_usuario,
         numero_identificacion, 
        contraseña, 
        nivel_acceso, 
        fechaRegistro, 
        fecha_hora_apertura, 
        fecha_hora_cierre, 
        saldo_inicial, 
        saldo_final, 
        venta_totales, 
        fecha_contratacion, 
        horario, 
        salario, 
        contacto, 
        fechaHoraReserva, 
        numComensales, 
        mesa, 
        id_mesas
    });
    } catch (error){
        return res.status(500).json({
            message:'Algo va mal',
        });
    }
};

export const deleteUsuarios = async (req,res) =>{
    try{
        const result = await pool.query('DELETE FROM usuarios WHERE id_usuarios = ?', [
            req.params.id_usuarios,
        ]);
    
        if (result.affectedRows <= 0)
            return res.status(404).json({
            message: 'Usuarios no encontrado',
            });
        res.sendStatus(204);
        }catch(error){
            return res.status(500).json({
            message:'Algo va mal',
        });
    }
};

export const updateUsuarios = async (req,res) =>{
    try{
        const {id_usuarios} = req.params;
        const {nombre_usuario, numero_identificacion, contraseña, nivel_acceso, fechaRegistro, fecha_hora_apertura, fecha_hora_cierre, saldo_inicial, saldo_final, venta_totales, fecha_contratacion, horario, salario, contacto, fechaHoraReserva, numComensales, mesa, id_mesas } = req.body;

        const [result] = await pool.query(
            'UPDATE usuarios SET nombre_usuario = IFNULL(?,nombre_usuario), numero_identificacion = IFNULL(?,numero_identificacion), contraseña = IFNULL(?,contraseña), nivel_acceso = IFNULL(?, nivel_acceso), fechaRegistro = IFNULL(?, fechaRegistro), fecha_hora_apertura = IFNULL(?, fecha_hora_apertura), fecha_hora_cierre = IFNULL(?, fecha_hora_cierre), saldo_inicial = IFNULL(?, saldo_inicial), saldo_final = IFNULL(?, saldo_final), venta_totales = IFNULL(?, venta_totales), fecha_contratacion = IFNULL(?, fecha_contratacion), horario = IFNULL(?, horario), salario = IFNULL(?, salario), contacto = IFNULL(?, contacto), fechaHoraReserva = IFNULL(?, fechaHoraReserva), numComensales = IFNULL(?, numComensales), mesa = IFNULL(?, mesa), id_mesas = IFNULL(?, id_mesas) WHERE id_usuarios = ?',
             [nombre_usuario, numero_identificacion, contraseña, nivel_acceso, fechaRegistro, fecha_hora_apertura, fecha_hora_cierre, saldo_inicial, saldo_final, venta_totales, fecha_contratacion, horario, salario, contacto, fechaHoraReserva, numComensales, mesa, id_mesas, id_usuarios]
        );

    if(result.affectedRows === 0)
     return res.status(404).json({
          message:'Usuarios no encontrado',
    });
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id_usuarios = ?',[
         id_usuarios,
    ]);

        res.json(rows[0]);
    } catch (error){
        return res.status(500).json({
            message:'Algo va mal',
        });
    }
};
