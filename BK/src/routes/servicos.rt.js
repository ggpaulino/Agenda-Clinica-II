import { Router } from 'express';
import { listarServicosPorId, listarServicos,criarServicos, atualizarServicos, deletarServicos } from '../controllers/servicos.ct.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/:id', auth, listarServicosPorId);
router.get('/', auth, listarServicos);
router.post('/', auth, criarServicos);
router.put('/:id', auth, atualizarServicos);
router.delete('/:id', auth, deletarServicos); 
export default router;