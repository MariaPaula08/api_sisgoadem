import {pool} from "../db.js"

export const getProveedoress = async (req, res)=>{
    try{
        const [rows] = await pool.query('SELECT * FROM proveedores')
        res.json(rows)
    } catch (error){
        return res.status(500).json({
            message:"Algo va mal"
        })
    } 
}

export const getProveedores = async (req, res)=>{
    try{
        const [rows] = await pool.query('SELECT * FROM proveedores WHERE id_proveedores = ?', [
            req.params.id_proveedores,
        ]);

        if(rows.length <= 0)
         return res.status(404).json({
        message: 'Proveedores no encontrado'
        });
        res.send(rows[0]);
    }catch (error){
        return res.status(500).json({
            message:'Algo va mal',
        });
    }
};

export const createProveedoress = async(req,res) => {
    try{
        const {id_proveedores, id_materiaPrima, nombre, contacto, empresa, correo, direccion, total_productos, historial_compras, id_inventario} = req.body
        const [rows] = await pool.query(
            "INSERT INTO proveedores(id_proveedores, id_materiaPrima, nombre, contacto, empresa, correo, direccion, total_productos, historial_compras, id_inventario) VALUES (?,?,?,?,?,?,?,?,?,?)", 
            [id_proveedores, id_materiaPrima, nombre, contacto, empresa, correo, direccion, total_productos, historial_compras, id_inventario]
        );
    res.send({
        id_proveedores: rows.insertId,
        id_materiaPrima, 
        nombre, 
        contacto, 
        empresa, 
        correo, 
        direccion, 
        total_productos, 
        historial_compras, 
        id_inventario
    });
    } catch (error){
        return res.status(500).json({
            message:'Algo va mal',
        });
    }
};

export const deleteProveedores = async (req,res) =>{
    try{
        const result = await pool.query('DELETE FROM proveedores WHERE id_proveedores = ?', [
            req.params.id_proveedores,
        ]);
    
        if (result.affectedRows <= 0)
            return res.status(404).json({
            message: 'Proveedores no encontrado',
            });
        res.sendStatus(204);
        }catch(error){
            return res.status(500).json({
            message:'Algo va mal',
        });
    }
};

export const updateProveedores = async (req,res) =>{
    try{
        const {id_proveedores} = req.params;
        const {id_materiaPrima, nombre, contacto, empresa, correo, direccion, total_productos, historial_compras, id_inventario } = req.body;

        const [result] = await pool.query(
            'UPDATE proveedores SET id_materiaPrima = IFNULL(?,id_materiaPrima), nombre = IFNULL(?,nombre), contacto = IFNULL(?,contacto), empresa = IFNULL(?, empresa), correo = IFNULL(?, correo), direccion = IFNULL(?, direccion), total_productos = IFNULL(?, total_productos), historial_compras = IFNULL(?, historial_compras), id_inventario = IFNULL(?, id_inventario) WHERE id_proveedores = ?',
             [id_materiaPrima, nombre, contacto, empresa, correo, direccion, total_productos, historial_compras, id_inventario, id_proveedores]
        );

    if(result.affectedRows === 0)
     return res.status(404).json({
          message:'Proveedores no encontrado',
    });
    const [rows] = await pool.query('SELECT * FROM proveedores WHERE id_proveedores = ?',[
         id_proveedores,
    ]);

        res.json(rows[0]);
    } catch (error){
        return res.status(500).json({
            message:'Algo va mal',
        });
    }
};
