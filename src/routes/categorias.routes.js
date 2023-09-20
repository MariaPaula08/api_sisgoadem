import {Router} from "express";
import { getCategorias, getCategoria, createCategorias, updateCategoria, deleteCategoria  } from "../controllers/categorias.controller.js";

const router = Router()

router.get('/categorias',getCategorias)
router.get('/categorias/:id_categoria',getCategoria)
router.post('/categorias',createCategorias)
router.patch('/categorias/:id_categoria',updateCategoria)
router.delete('/categorias/:id_categoria',deleteCategoria)

export default router