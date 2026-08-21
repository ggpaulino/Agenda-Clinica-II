import { Router } from 'express';
import { listarServicosPorId, listarServicos,criarServicos, atualizarServicos, deletarServicos } from '../controllers/servicos.ct.js';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';

const router = Router();

router.get('/:id', auth, listarServicosPorId);
router.get('/', auth, listarServicos);
router.post('/', auth, admin, criarServicos);
router.put('/:id', auth, admin, atualizarServicos);
router.delete('/:id', auth, admin, deletarServicos); 

export default router;