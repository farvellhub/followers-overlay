import { Router } from 'express';
import getFollowers from '../controllers/followers.controller.js';

const router = Router();

// Ruta para obtener la lista de seguidores
router.get('/followers', getFollowers);

export default router;



