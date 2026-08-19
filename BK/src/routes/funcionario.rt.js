import { Router } from 'express';
import { listarFuncionarioPorId, listarFuncionarios, listarCargos, criarFuncionario, atualizarFuncionario,deletarFuncionario } 
from '../controllers/funcionario.ct.js';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';


const router = Router();

router.get('/cargos', auth, admin, listarCargos);
router.get('/:id', auth, admin, listarFuncionarioPorId);
router.get('/', auth, admin, listarFuncionarios);
router.post('/', auth, admin, criarFuncionario);
router.put('/:id', auth, admin, atualizarFuncionario);
router.delete('/:id', auth, admin, deletarFuncionario);

export default router;