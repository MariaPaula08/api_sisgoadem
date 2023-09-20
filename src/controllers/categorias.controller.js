import {pool} from "../db.js"

export const getCategorias = async (req, res)=>{
    try{
        const [rows] = await pool.query('SELECT * FROM categoria')
        res.json(rows)
    } catch (error){
        return res.status(500).json({
            message:"Algo va mal"
        })
    } 
}

export const getCategoria = async (req, res)=>{
    try{
        const [rows] = await pool.query('SELECT * FROM categoria WHERE id_categoria = ?', [
            req.params.id_categoria,
        ]);

        if(rows.length <= 0)
         return res.status(404).json({
        message: 'Categoria no encontrado'
        });
        res.send(rows[0]);
    }catch (error){
        return res.status(500).json({
            message:"Algo va mal",
        });
    }
};

export const createCategorias = async(req,res) => {
    try{
        const {id_categoria, nombre_plato, descripcion, precio, tipo_plato, ingredientes, categoria_imagen} = req.body
        const [rows] = await pool.query(
            "INSERT INTO categoria (id_categoria, nombre_plato, descripcion, precio, tipo_plato, ingredientes, categoria_imagen) VALUES (?,?,?,?,?,?,?)", 
            [id_categoria, nombre_plato, descripcion, precio, tipo_plato, ingredientes, categoria_imagen]
        );
    res.send({
        id_categoria: rows.insertId,
        nombre_plato, 
        descripcion, 
        precio, 
        tipo_plato, 
        ingredientes, 
        categoria_imagen
    });
    } catch (error){
        return res.status(500).json({
            message:"Algo va mal",
        });
    }
};

export const deleteCategoria = async (req,res) =>{
    try{
        const result = await pool.query('DELETE FROM categoria WHERE id_categoria = ?', [
            req.params.id_categoria,
        ]);
    
        if (result.affectedRows <= 0)
            return res.status(404).json({
            message: 'Categoria no encontrado',
            });
        res.sendStatus(204);
        }catch(error){
            return res.status(500).json({
            message:"Algo va mal",
        });
    }
};

export const updateCategoria = async (req,res) =>{
    try{
        const {id_categoria} = req.params;
        const {nombre_plato, descripcion, precio, tipo_plato, ingredientes, categoria_imagen} = req.body;

        const [result] = await pool.query(
            'UPDATE categoria SET nombre_plato = IFNULL(?,nombre_plato), descripcion = IFNULL(?,descripcion), precio = IFNULL(?,precio), tipo_plato = IFNULL(?,tipo_plato), ingredientes = IFNULL(?,ingredientes), categoria_imagen = IFNULL(?,categoria_imagen) WHERE id_categoria = ?',
             [nombre_plato, descripcion, precio, tipo_plato, ingredientes, categoria_imagen, id_categoria]
        );
    if(result.affectedRows === 0)
     return res.status(404).json({
          message:"Categoria no encontrado",
    });
    const [rows] = await pool.query("SELECT * FROM categoria WHERE id_categoria = ?",[
        id_categoria,
    ]);

        res.json(rows[0]);
    } catch (error){
        return res.status(500).json({
            message:"Algo va mal",
        });
    }
};

