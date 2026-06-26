import { Router } from 'express';
import { listarAgendamento, listarporCliente, criarAgendamento, atualizarAgendamento, deletarAgendamento } from '../controllers/agendamentos.ct.js';
const router = Router();


router.get('/',listarAgendamento);
router.get('/clientes/:id', listarporCliente);
router.post('/',criarAgendamento);   
router.post('/atualizar/:id',atualizarAgendamento);
router.post('/deletar/:id',deletarAgendamento);

export default router;

/*
import { Router } from 'express';
import {
  listarAgendamentos,
  listarPorCliente,
  criarAgendamento,
  atualizarAgendamento,
  deletarAgendamento
} from '../controllers/agendamentos.ct.js';

const router = Router();

router.get('/', listarAgendamentos);
router.get('/clientes/:id', listarPorCliente);

router.post('/', criarAgendamento);

router.put('/:id', atualizarAgendamento);

router.delete('/:id', deletarAgendamento);

export default router;
*/