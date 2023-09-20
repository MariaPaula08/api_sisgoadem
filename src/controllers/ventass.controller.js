import {pool} from "../db.js"

export const getVentass = async (req, res)=>{
    try{
        const [rows] = await pool.query('SELECT * FROM venta')
        res.json(rows)
    } catch (error){
        return res.status(500).json({
            message:"Algo va mal"
        })
    } 
}

export const getVentas = async (req, res)=>{
    try{
        const [rows] = await pool.query('SELECT * FROM venta WHERE id_venta = ?', [
            req.params.id_venta,
        ]);

        if(rows.length <= 0)
         return res.status(404).json({
        message: 'Ventas no encontrado'
        });
        res.send(rows[0]);
    }catch (error){
        return res.status(500).json({
            message:'Algo va mal',
        });
    }
};

export const createVentass = async(req,res) => {
    try{
        const { id_venta, fechaVenta, Cajero, totalVenta, metodoPago, mesa, productos_vendidos, cantidad, precio_unitario, id_usuarios, id_mesa, id_facturacion} = req.body
        const [rows] = await pool.query(
            "INSERT INTO venta( id_venta, fechaVenta, Cajero, totalVenta, metodoPago, mesa, productos_vendidos, cantidad, precio_unitario, id_usuarios, id_mesa, id_facturacion) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", 
            [id_venta, fechaVenta, Cajero, totalVenta, metodoPago, mesa, productos_vendidos, cantidad, precio_unitario, id_usuarios, id_mesa, id_facturacion]
        );
    res.send({
        id_venta: rows.insertId,
        fechaVenta, 
        Cajero, 
        totalVenta, 
        metodoPago, 
        mesa, 
        productos_vendidos, 
        cantidad, 
        precio_unitario, 
        id_usuarios, 
        id_mesa, 
        id_facturacion
    });
    } catch (error){
        return res.status(500).json({
            message:'Algo va mal',
        });
    }
};

export const deleteVentas = async (req,res) =>{
    try{
        const result = await pool.query('DELETE FROM venta WHERE id_venta = ?', [
            req.params.id_venta,
        ]);
    
        if (result.affectedRows <= 0)
            return res.status(404).json({
            message: 'Ventas no encontrado',
            });
        res.sendStatus(204);
        }catch(error){
            return res.status(500).json({
            message:'Algo va mal',
        });
    }
};

export const updateVentas = async (req,res) =>{
    try{
        const {id_venta} = req.params;
        const {fechaVenta, Cajero, totalVenta, metodoPago, mesa, productos_vendidos, cantidad, precio_unitario, id_usuarios, id_mesa, id_facturacion} = req.body;

        const [result] = await pool.query(
            'UPDATE venta SET fechaVenta = IFNULL(?,fechaVenta), Cajero = IFNULL(?,Cajero), totalVenta = IFNULL(?,totalVenta), metodoPago = IFNULL(?,metodoPago), mesa = IFNULL(?,mesa) , productos_vendidos = IFNULL(?,productos_vendidos) , cantidad = IFNULL(?,cantidad) , precio_unitario = IFNULL(?,precio_unitario), id_usuarios = IFNULL(?,id_usuarios), id_mesa = IFNULL(?,id_mesa), id_facturacion = IFNULL(?,id_facturacion)  WHERE id_venta = ?',
             [fechaVenta, Cajero, totalVenta, metodoPago, mesa, productos_vendidos, cantidad, precio_unitario, id_usuarios, id_mesa, id_facturacion]
        );

    if(result.affectedRows === 0)
     return res.status(404).json({
          message:'Ventas no encontrado',
    });
    const [rows] = await pool.query('SELECT * FROM venta WHERE id_venta = ?',[
         id_venta,
    ]);

        res.json(rows[0]);
    } catch (error){
        return res.status(500).json({
            message:'Algo va mal',
        });
    }
};
