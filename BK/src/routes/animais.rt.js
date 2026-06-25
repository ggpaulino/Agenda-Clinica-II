import { Router } from 'express';
import { listarAnimais, listarAnimaisPorCliente, criarAnimais, atualizarAnimais, deletarAnimais } from '../controllers/animais.ct.js';

const router = Router();

router.get('/clientes/:id', listarAnimaisPorCliente);
router.get('/',listarAnimais);
router.post('/',criarAnimais);   
router.put('/:id', atualizarAnimais);
router.delete('/:id', deletarAnimais);

export default router;