import { Router } from 'express';
import { listarClientePorId, listarCliente, criarCliente, atualizarCliente, deletarCliente } from '../controllers/clientes.ct.js';
import auth from '../middleware/auth.js';


const router = Router();

router.get('/:id',auth,listarClientePorId);
router.get('/',auth,listarCliente);
router.post('/',auth,criarCliente);
router.put('/:id',auth,atualizarCliente);
router.delete('/:id',auth,deletarCliente); 
export default router;