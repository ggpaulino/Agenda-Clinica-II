import { Router } from 'express';
import { listarFornecedores,criarFornecedor,atualizarFornecedor,deletarFornecedor } from '../controllers/fornecedor.ct.js';
const router = Router();

router.get('/',listarFornecedores);
router.post('/',criarFornecedor);
router.put('/:id',atualizarFornecedor);
router.delete('/:id',deletarFornecedor); 
export default router;