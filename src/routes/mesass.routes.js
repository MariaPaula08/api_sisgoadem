import {Router} from "express";
import { getMesass, getMesas, createMesass, updateMesas, deleteMesas  } from "../controllers/mesass.controller.js";

const router = Router()

router.get('/mesass',getMesass)
router.get('/mesass/:id_mesa',getMesas)
router.post('/mesass',createMesass)
router.patch('/mesass/:id_mesa',updateMesas)
router.delete('/mesass/:id_mesa',deleteMesas)

export default router