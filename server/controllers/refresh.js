const SpotifyWebApi = require('spotify-web-api-node');

exports.refresh = (req, res) => {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: 'e953e7f016794c07a2ea4b7e77aab021',
        clientSecret: '73cadb1a00884ee19c1afe6bf3054040',
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