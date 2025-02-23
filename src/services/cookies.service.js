import getBroadcasterId from "./broadcster.service.js";

const setCookies = async (res, access_token, refresh_token) => {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Solo en producción
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        path: '/'
    };

    res.cookie('accessToken', access_token, cookieOptions);
    res.cookie('refreshToken', refresh_token, cookieOptions);

    const broadcasterId = await getBroadcasterId(access_token);
    if (broadcasterId) res.cookie('broadcasterId', broadcasterId, cookieOptions);
};

export default setCookies;
