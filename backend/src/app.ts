import express, { Application, Request, Response } from 'express';
import path from 'node:path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'node:url';

// Importar rutas
import authRoutes from './routes/auth.routes.js';
import followersRoutes from './routes/followers.routes.js';

// Arranca express
const app: Application = express();

// Ruta absoluta al directorio de origen
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Midlewares
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Levantar rutas
app.use('/auth', authRoutes);
app.use('/api', followersRoutes);

// Ruta de configuración
app.get('/config', (req: Request, res: Response) => {
    res.json({
        clientId: process.env.CLIENT_ID,
        callback: process.env.CALLBACK
    });
});

// Devolvemos overlay
app.get('/followers', (req: Request, res: Response) =>
    res.sendFile(path.join(__dirname, '../public/followers.html')));

export default app;