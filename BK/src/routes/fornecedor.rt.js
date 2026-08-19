import { Router } from 'express';
import { listarFornecedores,criarFornecedor, atualizarFornecedor,deletarFornecedor } from '../controllers/fornecedor.ct.js';
import admin from '../middleware/admin.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/',auth,admin,listarFornecedores);
router.post('/',auth,admin,criarFornecedor);
router.put('/:id',auth,admin,atualizarFornecedor);
router.delete('/:id',auth,admin,deletarFornecedor); 

export default router;