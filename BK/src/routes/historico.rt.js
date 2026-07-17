import { Router } from 'express';
import { listarHistorico } from '../controllers/historico.ct.js';
import auth from '../middleware/auth.js';

const router = Router();


router.get('/', auth, listarHistorico);

export default router;