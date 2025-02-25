import 'dotenv/config';
import app from './app.js';

// Dirección del server
const PORT: number = Number(process.env.PORT) || 3000;

// Levantar servidor en localhost en el puerto 3000
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});