import {pool} from "../db.js"

export const getMesass = async (req, res)=>{
    try{
        const [rows] = await pool.query('SELECT * FROM mesa')
        res.json(rows)
    } catch (error){
        return res.status(500).json({
            message:"Algo va mal"
        })
    } 
}

export const getMesas = async (req, res)=>{
    try{
        const [rows] = await pool.query('SELECT * FROM mesa WHERE id_mesa = ?', [
            req.params.id_mesa,
        ]);

        if(rows.length <= 0)
         return res.status(404).json({
        message: 'Mesas  no encontrado'
        });
        res.send(rows[0]);
    }catch (error){
        return res.status(500).json({
            message:"Algo va mal",
        });
    }
};

export const createMesass  = async(req,res) => {
    try{
        const {id_mesa, numeroMesa, capacidad, estado} = req.body
        const [rows] = await pool.query(
            "INSERT INTO mesa (id_mesa, numeroMesa, capacidad, estado) VALUES (?,?,?,?)", 
            [id_mesa, numeroMesa, capacidad, estado]
        );
    res.send({
        id_mesa: rows.insertId,
        numeroMesa, 
        capacidad, 
        estado
    });
    } catch (error){
        return res.status(500).json({
            message:"Algo va mal",
        });
    }
};

export const deleteMesas = async (req,res) =>{
    try{
        const result = await pool.query('DELETE FROM mesa WHERE id_mesa = ?', [
            req.params.id_mesa,
        ]);
    
        if (result.affectedRows <= 0)
            return res.status(404).json({
            message: 'Mesas no encontrado',
            });
        res.sendStatus(204);
        }catch(error){
            return res.status(500).json({
            message:"Algo va mal",
        });
    }
};

export const updateMesas  = async (req,res) =>{
    try{
        const {id_mesa} = req.params;
        const {numeroMesa, capacidad, estado} = req.body;

        const [result] = await pool.query(
            'UPDATE mesa SET numeroMesa = IFNULL(?,numeroMesa), capacidad = IFNULL(?,capacidad), estado = IFNULL(?,estado) WHERE id_mesa = ?',
             [numeroMesa, capacidad, estado, id_mesa]
        );
    if(result.affectedRows === 0)
     return res.status(404).json({
          message:"Mesas  no encontrado",
    });
    const [rows] = await pool.query("SELECT * FROM mesa WHERE id_mesa = ?",[
        id_mesa,
    ]);

        res.json(rows[0]);
    } catch (error){
        return res.status(500).json({
            message:"Algo va mal",
        });
    }
};

