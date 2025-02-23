import fetch from 'node-fetch';
import setCookies from '../services/cookies.service.js';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const CALLBACK = process.env.CALLBACK;

const handleCallback = async (req, res) => {
    const authorizationCode = req.query.code;
    if (!authorizationCode) return res.status(400).send('Código de autorización no recibido');
    
    try {
        const params = new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: authorizationCode,
            grant_type: 'authorization_code',
            redirect_uri: `${HOST}:${PORT}${CALLBACK}`,
        });

        const response = await fetch('https://id.twitch.tv/oauth2/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params
        });

        const data = await response.json();
        if (!data.access_token || !data.refresh_token)
            return res.status(400).send('Error al obtener los tokens');

        await setCookies(res, data.access_token, data.refresh_token);
        res.redirect('/followers');

    } catch (error) {
        console.error('Error en la autenticación:', error);
        res.status(500).send('Error en la autenticación');
    }
};

export default handleCallback;