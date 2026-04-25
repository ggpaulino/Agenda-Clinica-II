import express from 'express';
import cors from 'cors';
import clientesRouter from './routes/clientes.rt.js';
import animalRouter from './routes/animal.rt.js';
import funcionarioRouter from './routes/funcionario.rt.js'; 
import agendaRouter from './routes/agenda.rt.js';
import servicoRouter from './routes/servico.rt.js';
import fornecedorRouter from './routes/fornecedor.rt.js';
import historicoRouter from './routes/historico.rt.js'; 
import authRouter from './routes/auth.rt.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => { console.log('REQ:', req.method, req.url); next();});

// rotas
app.use('/api/clientes', clientesRouter);
app.use('/api/animais', animalRouter);
app.use('/api/agendamentos', agendaRouter);
app.use('/api/funcionarios', funcionarioRouter);
app.use('/api/servico', servicoRouter);
app.use('/api/fornecedores', fornecedorRouter);
app.use('/api/historico', historicoRouter);
app.use('/api/auth', authRouter);
export default app;
