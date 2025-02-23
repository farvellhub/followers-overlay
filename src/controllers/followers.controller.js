import fetch from 'node-fetch';

const CLIENT_ID = process.env.CLIENT_ID;

const getInfoFollowers = async (data, accessToken) => {
    const userIds = data.map(f => `id=${f.user_id}`).join('&');

    const userResponse = await fetch(`https://api.twitch.tv/helix/users?${userIds}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Client-Id': CLIENT_ID
        }
    });

    const userData = await userResponse.json();
    const followersInfo = userData.data.map(user => ({
        name: user.display_name,
        profile_image: user.profile_image_url
    }));

    return followersInfo;
}

const getFollowers = async (req, res) => {
    const { accessToken, broadcasterId } = req.cookies;
    if (!accessToken || !broadcasterId)
        return res.status(400).json({ error: 'Tokens no encontrados' });

    try {
        const followersUrl = `https://api.twitch.tv/helix/channels/followers?broadcaster_id=${broadcasterId}&first=30`;
        const response = await fetch(followersUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Client-Id': CLIENT_ID
            }
        });

        const data = await response.json();
        if (!data.data) return res.status(200).json([]);

        const followers = await getInfoFollowers(data.data, accessToken);

        res.status(200).json(followers);
    } catch (error) {
        console.error('Error al obtener seguidores:', error);
        res.status(500).json({ error: 'Error al obtener seguidores' });
    }
};

export default getFollowers;