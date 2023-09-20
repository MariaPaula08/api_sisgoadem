import {pool} from "../db.js"

export const getGastoss = async (req, res)=>{
    try{
        const [rows] = await pool.query('SELECT * FROM gastos')
        res.json(rows)
    } catch (error){
        return res.status(500).json({
            message:"Algo va mal"
        })
    } 
}

export const getGastos= async (req, res)=>{
    try{
        const [rows] = await pool.query('SELECT * FROM gastos WHERE id_gastos = ?', [
            req.params.id_gastos,
        ]);

        if(rows.length <= 0)
         return res.status(404).json({
        message: 'Gastos no encontrado'
        });
        res.send(rows[0]);
    }catch (error){
        return res.status(500).json({
            message:"Algo va mal",
        });
    }
};

export const createGastoss = async(req,res) => {
    try{
        const {id_gastos, tipo_gastos, fecha, monto, descripcion, fecha_reporte, resumen_ingresos_totales, resumen_gastos_totales, ganancias_netas, otros_indicadores} = req.body
        const [rows] = await pool.query(
            "INSERT INTO gastos (id_gastos, tipo_gastos, fecha, monto, descripcion, fecha_reporte, resumen_ingresos_totales, resumen_gastos_totales, ganancias_netas, otros_indicadores) VALUES (?,?,?,?,?,?,?,?,?,?)", 
            [id_gastos, tipo_gastos, fecha, monto, descripcion, fecha_reporte, resumen_ingresos_totales, resumen_gastos_totales, ganancias_netas, otros_indicadores]
        );
    res.send({
        id_gastos: rows.insertId,
        tipo_gastos, 
        fecha, 
        monto, 
        descripcion, 
        fecha_reporte, 
        resumen_ingresos_totales, 
        resumen_gastos_totales, 
        ganancias_netas, 
        otros_indicadores
    });
    } catch (error){
        return res.status(500).json({
            message:"Algo va mal",
        });
    }
};

export const deleteGastos  = async (req,res) =>{
    try{
        const result = await pool.query('DELETE FROM gastos WHERE id_gastos = ?', [
            req.params.id_gastos,
        ]);
    
        if (result.affectedRows <= 0)
            return res.status(404).json({
            message: 'Gastos  no encontrado',
            });
        res.sendStatus(204);
        }catch(error){
            return res.status(500).json({
            message:"Algo va mal",
        });
    }
};

export const updateGastos  = async (req,res) =>{
    try{
        const {id_gastos} = req.params;
        const {tipo_gastos, fecha, monto, descripcion, fecha_reporte, resumen_ingresos_totales, resumen_gastos_totales, ganancias_netas, otros_indicadores} = req.body;

        const [result] = await pool.query(
            'UPDATE gastos SET tipo_gastos = IFNULL(?,tipo_gastos), fecha = IFNULL(?,fecha), monto = IFNULL(?,monto), descripcion = IFNULL(?,descripcion), fecha_reporte = IFNULL(?,fecha_reporte), resumen_ingresos_totales = IFNULL(?,resumen_ingresos_totales), resumen_gastos_totales = IFNULL(?,resumen_gastos_totales), ganancias_netas = IFNULL(?,ganancias_netas), otros_indicadores = IFNULL(?,otros_indicadores) WHERE id_gastos = ?',
             [tipo_gastos, fecha, monto, descripcion, fecha_reporte, resumen_ingresos_totales, resumen_gastos_totales, ganancias_netas, otros_indicadores, id_gastos]
        );
    if(result.affectedRows === 0)
     return res.status(404).json({
          message:"Gastos  no encontrado",
    });
    const [rows] = await pool.query("SELECT * FROM gastos WHERE id_gastos = ?",[
        id_gastos,
    ]);

        res.json(rows[0]);
    } catch (error){
        return res.status(500).json({
            message:"Algo va mal",
        });
    }
};

