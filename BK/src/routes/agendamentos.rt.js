import { Router } from 'express';
import auth from '../middleware/auth.js';
import { listarAgendamento, listarporCliente, listarHorariosDisponiveis, listarFuncionariosDisponiveis, criarAgendamento,
          atualizarAgendamento, deletarAgendamento } from '../controllers/agendamentos.ct.js';

const router = Router();


router.get('/',listarAgendamento);
router.get('/clientes/:id', listarporCliente);
router.get('/disponibilidade', listarHorariosDisponiveis);
router.get('/executores/:servico_id',listarFuncionariosDisponiveis);
router.post('/',auth,criarAgendamento);   
router.put('/:id',auth,atualizarAgendamento);
router.delete('/:id',auth,deletarAgendamento);


export default router;