import {Router} from "express";
import { getUsuarioss, getUsuarios, createUsuarioss, updateUsuarios, deleteUsuarios  } from "../controllers/usuarioss.controller.js";

const router = Router()

router.get('/usuarioss',getUsuarioss)
router.get('/usuarioss/:id_usuarios',getUsuarios)
router.post('/usuarioss',createUsuarioss)
router.patch('/usuarioss/:id_usuarios',updateUsuarios)
router.delete('/usuarioss/:id_usuarios',deleteUsuarios)

export default router