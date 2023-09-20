import {pool} from "../db.js"

export const getInventarios = async (req, res)=>{
    try{
        const [rows] = await pool.query('SELECT * FROM inventario')
        res.json(rows)
    } catch (error){
        return res.status(500).json({
            message:"Algo va mal"
        })
    } 
}

export const getInventario = async (req, res)=>{
    try{
        const [rows] = await pool.query('SELECT * FROM inventario WHERE id_inventario = ?', [
            req.params.id_inventario,
        ]);

        if(rows.length <= 0)
         return res.status(404).json({
        message: 'Inventario no encontrado'
        });
        res.send(rows[0]);
    }catch (error){
        return res.status(500).json({
            message:'Algo va mal',
        });
    }
};

export const createInventarios = async(req,res) => {
    try{
        const {id_inventario, nombre, cantidad_en_stock, fecha_reposicion, id_proveedores} = req.body
        const [rows] = await pool.query(
            "INSERT INTO inventario (id_inventario, nombre, cantidad_en_stock, fecha_reposicion, id_proveedores) VALUES (?,?,?,?,?)", 
            [id_inventario, nombre, cantidad_en_stock, fecha_reposicion, id_proveedores]
        );
    res.send({
        id_inventario: rows.insertId,
        nombre, 
        cantidad_en_stock, 
        fecha_reposicion, 
        id_proveedores
    });
    } catch (error){
        return res.status(500).json({
            message:'Algo va mal',
        });
    }
};

export const deleteInventario = async (req,res) =>{
    try{
        const result = await pool.query('DELETE FROM inventario WHERE id_inventario = ?', [
            req.params.id_inventario,
        ]);
    
        if (result.affectedRows <= 0)
            return res.status(404).json({
            message: 'Inventario no encontrado',
            });
        res.sendStatus(204);
        }catch(error){
            return res.status(500).json({
            message:'Algo va mal',
        });
    }
};

export const updateInventario = async (req,res) =>{
    try{
        const {id_inventario} = req.params;
        const {nombre, cantidad_en_stock, fecha_reposicion, id_proveedores} = req.body;

        const [result] = await pool.query(
            'UPDATE inventario SET nombre = IFNULL(?,nombre), cantidad_en_stock = IFNULL(?,cantidad_en_stock), fecha_reposicion = IFNULL(?, fecha_reposicion), id_proveedores = IFNULL(?, id_proveedores) WHERE id_inventario = ?',
             [nombre, cantidad_en_stock, fecha_reposicion, id_proveedores, id_inventario]
        );

    if(result.affectedRows === 0)
     return res.status(404).json({
          message:'Inventario no encontrado',
    });
    const [rows] = await pool.query('SELECT * FROM inventario WHERE id_inventario = ?',[
         id_inventario,
    ]);

        res.json(rows[0]);
    } catch (error){
        return res.status(500).json({
            message:'Algo va mal',
        });
    }
};

