import {pool} from "../db.js"

export const getCajas = async (req, res)=>{
    try{
        const [rows] = await pool.query('SELECT * FROM caja')
        res.json(rows)
    } catch (error){
        return res.status(500).json({
            message:"Algo va mal"
        })
    } 
}

export const getCaja = async (req, res)=>{
    try{
        const [rows] = await pool.query('SELECT * FROM caja WHERE id_caja = ?', [
            req.params.id_caja,
        ]);

        if(rows.length <= 0)
         return res.status(404).json({
        message: 'Caja no encontrado',
        });
        res.send(rows[0]);
    }catch (error){
        return res.status(500).json({
            message:"Algo va mal",
        });
    }
};

export const createCajas = async(req,res) => {
    try{
        const {id_caja, nombre_plato, precio, tipo_pago, id_facturacion, id_gastos} = req.body
        const [rows] = await pool.query(
            "INSERT INTO caja (id_caja, nombre_plato, precio, tipo_pago, id_facturacion, id_gastos) VALUES (?, ?, ?, ?, ?, ?)", 
            [id_caja, nombre_plato, precio, tipo_pago, id_facturacion, id_gastos]
        );
    res.send({
        id_caja: rows.insertId,
        nombre_plato, 
        precio, 
        tipo_pago, 
        id_facturacion, 
        id_gastos
    });
    } catch (error){
        return res.status(500).json({
            message:"Algo va mal",
        });
    }
};

export const deleteCaja = async (req,res) =>{
    try{
        const result = await pool.query('DELETE FROM caja WHERE id_caja = ?', [
            req.params.id_caja,
        ]);
    
        if (result.affectedRows <= 0)
            return res.status(404).json({
            message: 'Caja no encontrado',
            });
        res.sendStatus(204);
        }catch(error){
            return res.status(500).json({
            message:"Algo va mal",
        });
    }
};

export const updateCaja = async (req,res) =>{
    try{
        const {id_caja} = req.params;
        const {nombre_plato, precio, tipo_pago, id_facturacion, id_gastos } = req.body;

        const [result] = await pool.query(
            "UPDATE caja SET nombre_plato = IFNULL(?,nombre_plato), precio = IFNULL(?,precio) , tipo_pago = IFNULL(?,tipo_pago), id_facturacion = IFNULL(?,id_facturacion), id_gastos = IFNULL(?,id_gastos) WHERE id_caja = ?",
             [nombre_plato, precio, tipo_pago, id_facturacion, id_gastos, id_caja]
        );
    if(result.affectedRows === 0)
     return res.status(404).json({
          message:"Caja no encontrado",
    });
    const [rows] = await pool.query("SELECT * FROM caja WHERE id_caja = ?",[
        id_caja,
    ]);

        res.json(rows[0]);
    } catch (error){
        return res.status(500).json({
            message:"Algo va mal",
        });
    }
};

