import {Router} from "express";
import { getCajas, getCaja, createCajas, updateCaja, deleteCaja  } from "../controllers/cajas.controller.js";

const router = Router()

router.get('/cajas',getCajas)
router.get('/cajas/:id_caja',getCaja)
router.post('/cajas',createCajas)
router.patch('/cajas/:id_caja',updateCaja)
router.delete('/cajas/:id_caja',deleteCaja)

export default router