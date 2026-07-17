import { Router } from 'express';
import { listarFornecedores,criarFornecedor,atualizarFornecedor,deletarFornecedor } from '../controllers/fornecedor.ct.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/',auth,listarFornecedores);
router.post('/',auth,criarFornecedor);
router.put('/:id',auth,atualizarFornecedor);
router.delete('/:id',auth,deletarFornecedor); 
export default router;