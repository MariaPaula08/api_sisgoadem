import {Router} from "express";
import { getVentass, getVentas, createVentass, updateVentas, deleteVentas  } from "../controllers/ventass.controller.js";

const router = Router()

router.get('/ventass',getVentass)
router.get('/ventass/:id_venta',getVentas)
router.post('/ventass',createVentass)
router.patch('/ventass/:id_venta',updateVentas)
router.delete('/ventass/:id_venta',deleteVentas)

export default router