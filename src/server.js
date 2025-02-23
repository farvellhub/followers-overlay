import 'dotenv/config';
import app from './app.js';

// Dirección del server
const HOST = process.env.HOST;
const PORT = process.env.PORT;

// Levantar servidor en localhost en el puerto 3000
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en ${HOST}:${PORT}`);
});