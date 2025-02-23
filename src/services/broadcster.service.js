import fetch from 'node-fetch';

const CLIENT_ID = process.env.CLIENT_ID;

const getBroadcasterId = async (access_token) => {
    const response = await fetch('https://api.twitch.tv/helix/users', {
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Client-Id': CLIENT_ID
        }
    });

    const data = await response.json();
    return data.data?.[0]?.id || null;
};

export default getBroadcasterId;