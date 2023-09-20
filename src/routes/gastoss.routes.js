import {Router} from "express";
import { getGastoss, getGastos, createGastoss, updateGastos, deleteGastos  } from "../controllers/gastoss.controller.js";

const router = Router()

router.get('/gastoss',getGastoss)
router.get('/gastoss/:id_gastos',getGastos)
router.post('/gastoss',createGastoss)
router.patch('/gastoss/:id_gastos',updateGastos)
router.delete('/gastoss/:id_gastos',deleteGastos)

export default router