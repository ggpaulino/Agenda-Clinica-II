import express from 'express';
import {listarUsuarios,buscarUsuarios,criarUsuarios,atualizarUsuarios, deletarUsuarios} from '../controllers/usuario.ct.js';

const router = express.Router();

router.get('/',listarUsuarios);
router.get('/:id',buscarUsuarios);
router.post('/',criarUsuarios);
router.put('/:id',atualizarUsuarios);
router.delete('/:id',deletarUsuarios);

export default router;