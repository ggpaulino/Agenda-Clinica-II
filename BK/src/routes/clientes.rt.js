import { Router } from 'express';
import { listarClientePorId, listarCliente, criarCliente, atualizarCliente, deletarCliente } from '../controllers/clientes.ct.js';
const router = Router();

router.get('/:id',listarClientePorId);
router.get('/',listarCliente);
router.post('/',criarCliente);
router.put('/:id',atualizarCliente);
router.delete('/:id',deletarCliente); 
export default router;