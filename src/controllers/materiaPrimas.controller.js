import {pool} from "../db.js"

export const getMateriaPrimas = async (req, res)=>{
    try{
        const [rows] = await pool.query('SELECT * FROM materiaPrima')
        res.json(rows)
    } catch (error){
        return res.status(500).json({
            message:"Algo va mal"
        })
    } 
}

export const getMateriaPrima = async (req, res)=>{
    try{
        const [rows] = await pool.query('SELECT * FROM materiaPrima WHERE id_materiaPrima = ?', [
            req.params.id_materiaPrima,
        ]);

        if(rows.length <= 0)
         return res.status(404).json({
        message: 'MateriaPrima no encontrado'
        });
        res.send(rows[0]);
    }catch (error){
        return res.status(500).json({
            message:"Algo va mal",
        });
    }
};

export const createMateriaPrimas = async(req,res) => {
    try{
        const {id_materiaPrima, nombre, descripcion, precio_unitario, cantidad_insumo, categoria, ingredientes, producto_imagen, id_ventas} = req.body
        const [rows] = await pool.query(
            "INSERT INTO materiaPrima (id_materiaPrima, nombre, descripcion, precio_unitario, cantidad_insumo, categoria, ingredientes, producto_imagen, id_ventas) VALUES (?,?,?,?,?,?,?,?,?)", 
            [id_materiaPrima, nombre, descripcion, precio_unitario, cantidad_insumo, categoria, ingredientes, producto_imagen, id_ventas]
        );
    res.send({
        id_materiaPrima: rows.insertId,
        nombre, 
        descripcion, 
        precio_unitario, 
        cantidad_insumo, 
        categoria, 
        ingredientes, 
        producto_imagen, 
        id_ventas
    });
    } catch (error){
        return res.status(500).json({
            message:"Algo va mal",
        });
    }
};

export const deleteMateriaPrima = async (req,res) =>{
    try{
        const result = await pool.query('DELETE FROM materiaPrima WHERE id_materiaPrima = ?', [
            req.params.id_materiaPrima,
        ]);
    
        if (result.affectedRows <= 0)
            return res.status(404).json({
            message: 'MateriaPrima no encontrado',
            });
        res.sendStatus(204);
        }catch(error){
            return res.status(500).json({
            message:"Algo va mal",
        });
    }
};

export const updateMateriaPrima = async (req,res) =>{
    try{
        const {id_materiaPrima} = req.params;
        const {nombre, descripcion, precio_unitario, cantidad_insumo, categoria, ingredientes, producto_imagen, id_ventas} = req.body;

        const [result] = await pool.query(
            'UPDATE materiaPrima SET nombre = IFNULL(?,nombre), descripcion = IFNULL(?,descripcion), precio_unitario = IFNULL(?,precio_unitario), cantidad_insumo = IFNULL(?,cantidad_insumo), categoria = IFNULL(?,categoria), ingredientes = IFNULL(?,ingredientes), producto_imagen = IFNULL(?,producto_imagen), id_ventas = IFNULL(?,id_ventas) WHERE id_materiaPrima = ?',
             [nombre, descripcion, precio_unitario, cantidad_insumo, categoria, ingredientes, producto_imagen, id_ventas, id_materiaPrima]
        );
    if(result.affectedRows === 0)
     return res.status(404).json({
          message:"MateriaPrima no encontrado",
    });
    const [rows] = await pool.query("SELECT * FROM materiaPrima WHERE id_materiaPrima = ?",[
        id_materiaPrima,
    ]);

        res.json(rows[0]);
    } catch (error){
        return res.status(500).json({
            message:"Algo va mal",
        });
    }
};

