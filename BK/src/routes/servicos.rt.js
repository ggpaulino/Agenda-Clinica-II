import { Router } from 'express';
import { listarServicosPorId, listarServicos,criarServicos, atualizarServicos, deletarServicos } from '../controllers/servicos.ct.js';
const router = Router();

router.get('/:id',listarServicosPorId);
router.get('/',listarServicos);
router.post('/',criarServicos);
router.put('/:id',atualizarServicos);
router.delete('/:id',deletarServicos); 
export default router;