import express from 'express';
import handleCallback from '../controllers/auth.controller.js';

const router = express.Router();

// Ruta de autenticación
router.get('/callback', handleCallback);

export default router;