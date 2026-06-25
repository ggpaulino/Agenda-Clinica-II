import { Router } from 'express';
import { listarAnimais, listarAnimaisPorCliente, criarAnimais, atualizarAnimais, deletarAnimais } from '../controllers/animais.ct.js';

const router = Router();

router.get('/', listarAnimais);
router.get('/clientes/:id', listarAnimaisPorCliente);
router.post('/',criarAnimais);   
router.put('/:id', atualizarAnimais);
router.delete('/:id', deletarAnimais);

export default router;
