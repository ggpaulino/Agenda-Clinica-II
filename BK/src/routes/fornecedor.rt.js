import { Router } from 'express';
import { listarFornecedores,criarFornecedor,listarFuncionarioporId, listarFuncionarios, listarCargos, 
    atualizarFornecedor,deletarFornecedor, criarFuncionario, atualizarFuncionario, deletarFuncionario } from '../controllers/fornecedor.ct.js';
import admin from '../middleware/admin.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/',auth,admin,listarFornecedores);
router.get('/funcionarios',auth,admin,listarFuncionarios);
router.get('/funcionarios/:id',auth,admin,listarFuncionarioporId);
router.get('/cargos',auth,admin,listarCargos);
router.post('/funcionarios',auth,admin,criarFuncionario);
router.post('/',auth,admin,criarFornecedor);
router.put('/funcionarios/:id',auth,admin,atualizarFuncionario);
router.put('/:id',auth,admin,atualizarFornecedor);
router.delete('/funcionarios/:id',auth,admin,deletarFuncionario);
router.delete('/:id',auth,admin,deletarFornecedor); 

export default router;