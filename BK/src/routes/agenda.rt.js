import { Router } from 'express';
import { listarAgendamento, criarAgendamento, atualizarAgendamento, deletarAgendamento } from '../controllers/agenda.ct.js';
const router = Router();


router.get('/',listarAgendamento);
router.post('/',criarAgendamento);   
router.post('/atualizar/:id',atualizarAgendamento);
router.post('/deletar/:id',deletarAgendamento);

export default router;