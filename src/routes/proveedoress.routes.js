import {Router} from "express";
import { getProveedoress, getProveedores, createProveedoress, updateProveedores, deleteProveedores  } from "../controllers/proveedoress.controller.js";

const router = Router()

router.get('/proveedoress',getProveedoress)
router.get('/proveedoress/:id_proveedores',getProveedores)
router.post('/proveedoress',createProveedoress)
router.patch('/proveedoress/:id_proveedores',updateProveedores)
router.delete('/proveedoress/:id_proveedores',deleteProveedores)

export default router