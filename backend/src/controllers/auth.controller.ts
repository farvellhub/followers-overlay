import { Request, Response } from 'express';
import fetch from 'node-fetch';
import setCookies from '../services/cookies.service.js';

const CLIENT_ID: string = process.env.CLIENT_ID as string;
const CLIENT_SECRET: string = process.env.CLIENT_SECRET as string;
const CALLBACK: string = process.env.CALLBACK as string;

const handleCallback = async (req: Request, res: Response): Promise<void> => {
    const authorizationCode = req.query.code as string;
    if (!authorizationCode) {
        res.status(400).send('Código de autorización no recibido');
        return;
    }
    
    try {
        const params = new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: authorizationCode,
            grant_type: 'authorization_code',
            redirect_uri: CALLBACK,
        });

        const response = await fetch('https://id.twitch.tv/oauth2/token', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded' 
            },
            body: params
        });

        const data = await response.json();
        console.log("Respuesta de Twitch:", data);
        if (!data.access_token || !data.refresh_token) {
            res.status(400).send('Error al obtener los tokens');
            return;
        }

        await setCookies(res, data.access_token, data.refresh_token);
        res.redirect('/followers');

    } catch (error) {
        console.error('Error en la autenticación:', error);
        res.status(500).send('Error en la autenticación');
    }
};

export default handleCallback;