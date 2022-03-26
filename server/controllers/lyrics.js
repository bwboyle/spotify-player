const lyricsFinder = require('lyrics-finder');

exports.lyrics = async (req, res) => {
  const lyrics = 
    (await lyricsFinder(req.query.artist, req.query.track)) || "No lyrics found"

  res.json({"lyrics": lyrics})
}