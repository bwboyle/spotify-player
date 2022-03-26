const SpotifyWebApi = require('spotify-web-api-node');

exports.login = (req, res) => {
    const code = req.body.code

    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: 'SPOTIFY_CLIENT_ID',
        clientSecret: 'SPOTIFY_CLIENT_SECRET' 
    });

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.status(200).json({
            success: true,
            data: {
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in
            }
        });
    })
    .catch(() => {
        res.status(400).json({
            success: false,
            console: "Failed to authenticate."
        });
    });
}