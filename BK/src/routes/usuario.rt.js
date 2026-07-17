import express from 'express';
import {listarUsuarios,buscarUsuarios,criarUsuarios,atualizarUsuarios, deletarUsuarios} from '../controllers/usuario.ct.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/',auth,listarUsuarios);
router.get('/:id',auth,buscarUsuarios);
router.post('/',auth,criarUsuarios);
router.put('/:id',auth,atualizarUsuarios);
router.delete('/:id',auth,deletarUsuarios);

export default router;