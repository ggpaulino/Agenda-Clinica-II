import express from 'express';
import {listarUsuarios,buscarUsuarios,criarUsuarios,atualizarUsuarios, deletarUsuarios} from '../controllers/usuario.ct.js';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';


const router = express.Router();

router.get('/',auth,admin,listarUsuarios);
router.get('/:id',auth,admin,buscarUsuarios);
router.post('/',auth,admin,criarUsuarios);
router.put('/:id',auth,admin,atualizarUsuarios);
router.delete('/:id',auth,admin,deletarUsuarios);

export default router;