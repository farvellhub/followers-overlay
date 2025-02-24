import { Router } from 'express';
import handleCallback from '../controllers/auth.controller.js';

const router = Router();

// Ruta de autenticación
router.get('/callback', handleCallback);

export default router;