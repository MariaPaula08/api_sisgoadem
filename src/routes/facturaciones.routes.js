import {Router} from "express";
import { getFacturaciones, getFacturacion, createFacturaciones, updateFacturacion, deleteFacturacion  } from "../controllers/facturaciones.controller.js";

const router = Router()

router.get('/facturaciones',getFacturaciones)
router.get('/facturaciones/:id_facturacion',getFacturacion)
router.post('/facturaciones',createFacturaciones)
router.patch('/facturaciones/:id_facturacion',updateFacturacion)
router.delete('/facturaciones/:id_facturacion',deleteFacturacion)

export default router