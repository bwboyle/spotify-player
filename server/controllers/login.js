const SpotifyWebApi = require('spotify-web-api-node');

exports.login = (req, res) => {
    const code = req.body.code

    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: 'e953e7f016794c07a2ea4b7e77aab021',
        clientSecret: '73cadb1a00884ee19c1afe6bf3054040' 
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