import {pool} from "../db.js"

export const getTransaccioness = async (req, res)=>{
    try{
        const [rows] = await pool.query('SELECT * FROM transacciones')
        res.json(rows)
    } catch (error){
        return res.status(500).json({
            message:"Algo va mal"
        })
    } 
}

export const getTransacciones = async (req, res)=>{
    try{
        const [rows] = await pool.query('SELECT * FROM transacciones WHERE id_transacciones = ?', [
            req.params.id_transacciones,
        ]);

        if(rows.length <= 0)
         return res.status(404).json({
        message: 'Transacciones no encontrado'
        });
        res.send(rows[0]);
    }catch (error){
        return res.status(500).json({
            message:"Algo va mal",
        });
    }
};

export const createTransaccioness = async(req,res) => {
    try{
        const {id_transacciones, fecha_hora_transaccion, tipo_transaccion, descripcion_transaccion, nombre_cuenta, tipo_cuenta, saldo_actual, fuente_ingresos, monto_ingreso, id_caja} = req.body
        const [rows] = await pool.query(
            "INSERT INTO transacciones(id_transacciones, fecha_hora_transaccion, tipo_transaccion, descripcion_transaccion, nombre_cuenta, tipo_cuenta, saldo_actual, fuente_ingresos, monto_ingreso, id_caja) VALUES (?,?,?,?,?,?,?,?,?,?)", 
            [id_transacciones, fecha_hora_transaccion, tipo_transaccion, descripcion_transaccion, nombre_cuenta, tipo_cuenta, saldo_actual, fuente_ingresos, monto_ingreso, id_caja]
        );
        res.send({
            id_transacciones: rows.insertId,
            fecha_hora_transaccion, 
            tipo_transaccion, 
            descripcion_transaccion,
            nombre_cuenta, 
            tipo_cuenta, 
            saldo_actual, 
            fuente_ingresos, 
            monto_ingreso, 
            id_caja
        });
    } catch (error){
        return res.status(500).json({
            message:'Algo va mal',
        });
    }
};
export const deleteTransacciones = async (req,res) =>{
    try{
        const result = await pool.query('DELETE FROM transacciones WHERE id_transacciones = ?', [
            req.params.id_transacciones,
        ]);
    
        if (result.affectedRows <= 0)
            return res.status(404).json({
            message: 'Transacciones no encontrado',
            });
        res.sendStatus(204);
        }catch(error){
            return res.status(500).json({
            message:"Algo va mal",
        });
    }
};

export const updateTransacciones = async (req,res) =>{
    try{
        const {id_transacciones} = req.params;
        const {fecha_hora_transaccion, tipo_transaccion, descripcion_transaccion, nombre_cuenta, tipo_cuenta, saldo_actual, fuente_ingresos, monto_ingreso, id_caja} = req.body;

        const [result] = await pool.query(
            'UPDATE transacciones SET fecha_hora_transaccion = IFNULL(?,fecha_hora_transaccion), tipo_transaccion = IFNULL(?,tipo_transaccion) , descripcion_transaccion = IFNULL(?,descripcion_transaccion), nombre_cuenta = IFNULL(?,nombre_cuenta), tipo_cuenta = IFNULL(?,tipo_cuenta), saldo_actual = IFNULL(?,saldo_actual), fuente_ingresos = IFNULL(?,fuente_ingresos), monto_ingreso = IFNULL(?,monto_ingreso), id_caja = IFNULL(?,id_caja)  WHERE id_transacciones = ?',
             [fecha_hora_transaccion, tipo_transaccion, descripcion_transaccion, nombre_cuenta, tipo_cuenta, saldo_actual, fuente_ingresos, monto_ingreso, id_caja, id_transacciones]
        );
    if(result.affectedRows === 0)
     return res.status(404).json({
          message:"Transacciones no encontrado",
    });
    const [rows] = await pool.query("SELECT * FROM transacciones WHERE id_transacciones = ?",[
        id_transacciones,
    ]);

        res.json(rows[0]);
    } catch (error){
        return res.status(500).json({
            message:"Algo va mal",
        });
    }
};

