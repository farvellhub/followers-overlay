import getBroadcasterId from "./broadcster.service.js";

// Variable global para guardar tokens
export let tokens = null;

const setCookies = async (res, access_token, refresh_token) => {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Solo en producción
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        path: '/'
    };

    // Guardamos en cookies los OAuth tokens
    res.cookie('accessToken', access_token, cookieOptions);
    res.cookie('refreshToken', refresh_token, cookieOptions);

    // Pedimos y guardamos en cookies broadcaster_id
    const broadcaster_id = await getBroadcasterId(access_token);
    if (broadcaster_id) res.cookie('broadcasterId', broadcaster_id, cookieOptions);

    // Guardamos en variable global los tokens
    tokens = {
        accessToken: access_token,
        refreshToken: refresh_token,
        broadcasterId: broadcaster_id
    }
};

export default setCookies;
