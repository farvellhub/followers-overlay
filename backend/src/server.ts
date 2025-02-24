import 'dotenv/config';
import app from './app.js';

// Dirección del server
const HOST: string = process.env.HOST as string;
const PORT: number = Number(process.env.PORT);

// Levantar servidor en localhost en el puerto 3000
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en ${HOST}:${PORT}`);
});