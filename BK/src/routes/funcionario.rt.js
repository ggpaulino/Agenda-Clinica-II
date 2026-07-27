import { Router } from 'express';
import { listarFuncionarioPorId, listarFuncionarios, listarCargos, criarFuncionario, atualizarFuncionario,deletarFuncionario } 
from '../controllers/funcionario.ct.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/cargos', listarCargos);
router.get('/:id', auth, listarFuncionarioPorId);
router.get('/', auth, listarFuncionarios);
router.post('/', auth, criarFuncionario);
router.put('/:id', auth, atualizarFuncionario);
router.delete('/:id', auth, deletarFuncionario);
export default router;