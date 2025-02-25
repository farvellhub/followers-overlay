const getAuthUrl = (
    clientId: string,
    redirectUri: string,
): string => {
    const scope = encodeURIComponent("moderator:read:followers");
    const redirect_uri = encodeURIComponent(redirectUri);
    const request_uri =
        "https://id.twitch.tv/oauth2/authorize?response_type=code";
    return `${request_uri}&client_id=${clientId}&redirect_uri=${redirect_uri}&scope=${scope}`;
};

export default getAuthUrl;