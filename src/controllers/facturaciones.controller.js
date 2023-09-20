import {pool} from "../db.js"

export const getFacturaciones = async (req, res)=>{
    try{
        const [rows] = await pool.query('SELECT * FROM facturacion')
        res.json(rows)
    } catch (error){
        return res.status(500).json({
            message:"Algo va mal"
        })
    } 
}

export const getFacturacion = async (req, res)=>{
    try{
        const [rows] = await pool.query('SELECT * FROM facturacion WHERE id_facturacion = ?', [
            req.params.id_facturacion,
        ]);

        if(rows.length <= 0)
         return res.status(404).json({
        message: 'Facturacion no encontrado'
        });
        res.send(rows[0]);
    }catch (error){
        return res.status(500).json({
            message:'Algo va mal',
        });
    }
};

export const createFacturaciones = async(req,res) => {
    try{
        const {id_facturacion, hora, fecha, platos, bebidas, cantidad_platos, valor_unitario, valor_total, fecha_pedido, hora_solicitud, estado_pedido, notas_adicionales, id_mesa, id_categoria, id_caja } = req.body
        const [rows] = await pool.query(
            "INSERT INTO facturacion(id_facturacion, hora, fecha, platos, bebidas, cantidad_platos, valor_unitario, valor_total, fecha_pedido, hora_solicitud, estado_pedido, notas_adicionales, id_mesa, id_categoria, id_caja ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", 
            [id_facturacion, hora, fecha, platos, bebidas, cantidad_platos, valor_unitario, valor_total, fecha_pedido, hora_solicitud, estado_pedido, notas_adicionales, id_mesa, id_categoria, id_caja ]
        );
    res.send({
        id_facturacion: rows.insertId,
        hora, 
        fecha, 
        platos, 
        bebidas, 
        cantidad_platos, 
        valor_unitario, 
        valor_total, 
        fecha_pedido, 
        hora_solicitud, 
        estado_pedido, 
        notas_adicionales, 
        id_mesa, 
        id_categoria, 
        id_caja 
    });
    } catch (error){
        return res.status(500).json({
            message:'Algo va mal',
        });
    }
};

export const deleteFacturacion = async (req,res) =>{
    try{
        const result = await pool.query('DELETE FROM facturacion WHERE id_facturacion = ?', [
            req.params.id_facturacion,
        ]);
    
        if (result.affectedRows <= 0)
            return res.status(404).json({
            message: 'Facturacion no encontrado',
            });
        res.sendStatus(204);
        }catch(error){
            return res.status(500).json({
            message:'Algo va mal',
        });
    }
};

export const updateFacturacion = async (req,res) =>{
    try{
        const {id_facturacion} = req.params;
        const {hora, fecha, platos, bebidas, cantidad_platos, valor_unitario, valor_total, fecha_pedido, hora_solicitud, estado_pedido, notas_adicionales, id_mesa, id_categoria, id_caja } = req.body;

        const [result] = await pool.query(
            'UPDATE facturacion SET hora = IFNULL(?,hora), fecha = IFNULL(?,fecha), platos = IFNULL(?, platos), bebidas = IFNULL(?, bebidas), cantidad_platos = IFNULL(?, cantidad_platos), valor_unitario = IFNULL(?, valor_unitario), valor_total = IFNULL(?, valor_total), fecha_pedido = IFNULL(?, fecha_pedido), hora_solicitud = IFNULL(?, hora_solicitud), estado_pedido = IFNULL(?, estado_pedido), notas_adicionales = IFNULL(?, notas_adicionales), id_mesa = IFNULL(?, id_mesa), id_categoria = IFNULL(?, id_categoria), id_caja = IFNULL(?, id_caja) WHERE id_facturacion = ?',
             [hora, fecha, platos, bebidas, cantidad_platos, valor_unitario, valor_total, fecha_pedido, hora_solicitud, estado_pedido, notas_adicionales, id_mesa, id_categoria, id_caja, id_facturacion]
        );

    if(result.affectedRows === 0)
     return res.status(404).json({
          message:'Facturacion no encontrado',
    });
    const [rows] = await pool.query('SELECT * FROM facturacion WHERE id_facturacion = ?',[
         id_facturacion,
    ]);

        res.json(rows[0]);
    } catch (error){
        return res.status(500).json({
            message:'Algo va mal',
        });
    }
};
