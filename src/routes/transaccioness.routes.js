import {Router} from "express";
import { getTransaccioness, getTransacciones, createTransaccioness, updateTransacciones, deleteTransacciones  } from "../controllers/transaccioness.controller.js";

const router = Router()

router.get('/transaccioness',getTransaccioness)
router.get('/transaccioness/:id_transacciones',getTransacciones)
router.post('/transaccioness',createTransaccioness)
router.patch('/transaccioness/:id_transacciones',updateTransacciones)
router.delete('/transaccioness/:id_transacciones',deleteTransacciones)

export default router