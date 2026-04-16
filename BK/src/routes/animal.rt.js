import { Router } from 'express';
import { listarAnimais, criarAnimal,atualizarAnimal,deletarAnimal } from '../controllers/animal.ct.js';
const router = Router();


router.get('/',listarAnimais);
router.post('/',criarAnimal);   
router.post('/atualizar/:id',atualizarAnimal);
router.post('/deletar/:id',deletarAnimal);

export default router;