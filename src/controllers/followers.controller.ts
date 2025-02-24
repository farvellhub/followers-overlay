import { Request, Response } from 'express';
import fetch from 'node-fetch';
import { tokens } from '../services/cookies.service.js';

const CLIENT_ID: string = process.env.CLIENT_ID as string;

type InfoFollowersType = Promise<Array<{ name: string; profile_image: string }>>;
const getInfoFollowers = async (data: any[], accessToken: string): InfoFollowersType => {
    const userIds = data.map(f => `id=${f.user_id}`).join('&');

    const userResponse = await fetch(`https://api.twitch.tv/helix/users?${userIds}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Client-Id': CLIENT_ID
        }
    });

    const userData = await userResponse.json();
    const followersInfo = userData.data.map((user: any) => ({
        name: user.display_name,
        profile_image: user.profile_image_url
    }));

    return followersInfo;
}

const getFollowers = async (req: Request, res: Response): Promise<void> => {
    if (!tokens || !tokens.accessToken) {
        res.status(400).json({ error: 'El servidor no está autenticado con Twitch' });
        return;
    }

    const { accessToken, broadcasterId } = tokens || req.cookies;
    if (!accessToken || !broadcasterId) {
        res.status(400).json({ error: 'Tokens no encontrados' });
        return;
    }

    try {
        const followersUrl = `https://api.twitch.tv/helix/channels/followers?broadcaster_id=${broadcasterId}&first=30`;
        const response = await fetch(followersUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Client-Id': CLIENT_ID
            }
        });

        const data = await response.json();
        if (!data.data) {
            res.status(200).json([]);
            return;
        }

        const followers = await getInfoFollowers(data.data, accessToken);
        res.status(200).json(followers);

    } catch (error) {
        console.error('Error al obtener seguidores:', error);
        res.status(500).json({ error: 'Error al obtener seguidores' });
    }
};

export default getFollowers;