import { Router } from 'express';
import { listarAnimais, listarAnimaisPorCliente, criarAnimais, atualizarAnimais, deletarAnimais } from '../controllers/animais.ct.js';

const router = Router();

router.get('/cliente/:id', listarAnimaisPorCliente);
router.get('/',listarAnimais);
router.post('/',criarAnimais);   
router.post('/atualizar/:id',atualizarAnimais);
router.post('/deletar/:id',deletarAnimais);

export default router;