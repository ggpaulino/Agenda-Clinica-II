import { Router } from 'express';
import { listarFuncionarioPorId, listarFuncionarios, criarFuncionario, atualizarFuncionario,deletarFuncionario } from '../controllers/funcionario.ct.js';
const router = Router();

router.get('/:id',listarFuncionarioPorId);
router.get('/',listarFuncionarios);
router.post('/',criarFuncionario);
router.put('/:id',atualizarFuncionario);
router.delete('/:id',deletarFuncionario); 
export default router;