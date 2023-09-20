import {Router} from "express";
import { getInventarios, getInventario, createInventarios, updateInventario, deleteInventario  } from "../controllers/inventarios.controller.js";

const router = Router()

router.get('/inventarios',getInventarios)
router.get('/inventarios/:id_inventario',getInventario)
router.post('/inventarios',createInventarios)
router.patch('/inventarios/:id_inventario',updateInventario)
router.delete('/inventarios/:id_inventario',deleteInventario)

export default router