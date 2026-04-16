import { Router } from 'express';
import { listarServicoPorId, listarServicos,criarServico, atualizarServico, deletarServico } from '../controllers/servico.ct.js';
const router = Router();

router.get('/:id',listarServicoPorId);
router.get('/',listarServicos);
router.post('/',criarServico);
router.put('/:id',atualizarServico);
router.delete('/:id',deletarServico); 
export default router;