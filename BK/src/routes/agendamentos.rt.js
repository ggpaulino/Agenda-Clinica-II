import { Router } from 'express';
import auth from '../middleware/auth.js';
import { listarAgendamento, listarporCliente, criarAgendamento,
          atualizarAgendamento, deletarAgendamento } from '../controllers/agendamentos.ct.js';

const router = Router();


router.get('/',listarAgendamento);
router.get('/clientes/:id', listarporCliente);
router.post('/',auth,criarAgendamento);   
router.put('/:id',auth,atualizarAgendamento);
router.delete('/:id',auth,deletarAgendamento);

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