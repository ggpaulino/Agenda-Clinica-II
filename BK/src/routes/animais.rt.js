import { Router } from 'express';
import { listarAnimais, listarAnimaisPorCliente, criarAnimais, atualizarAnimais, deletarAnimais } from '../controllers/animais.ct.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/', auth, listarAnimais);
router.get('/clientes/:id', auth, listarAnimaisPorCliente);
router.post('/', auth, criarAnimais);
router.put('/:id', auth, atualizarAnimais);
router.delete('/:id', auth, deletarAnimais);

export default router;
