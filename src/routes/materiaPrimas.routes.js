import {Router} from "express";
import { getMateriaPrimas, getMateriaPrima, createMateriaPrimas, updateMateriaPrima, deleteMateriaPrima  } from "../controllers/materiaPrimas.controller.js";

const router = Router()

router.get('/materiaPrimas',getMateriaPrimas)
router.get('/materiaPrimas/:id_materiaPrima',getMateriaPrima)
router.post('/materiaPrimas',createMateriaPrimas)
router.patch('/materiaPrimas/:id_materiaPrima',updateMateriaPrima)
router.delete('/materiaPrimas/:id_materiaPrima',deleteMateriaPrima)

export default router