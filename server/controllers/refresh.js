const SpotifyWebApi = require('spotify-web-api-node');

exports.refresh = (req, res) => {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: 'SPOTIFY_CLIENT_ID',
        clientSecret: 'SPOTIFY_CLIENT_SECRET', 
        refreshToken 
    });

    spotifyApi.refreshAccessToken().then((data) => {
        res.status(200).json({
            success: true,
            data: {
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in
            }
        });
    })
    .catch((err) => {
        res.status(500).json({
            success: false,
            console: "Failed to refresh token"
        });
    });
}