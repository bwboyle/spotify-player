import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  if (!accessToken) return null;

  return <SpotifyPlayer 
    token={accessToken}
    showSaveIcon
    callback={state => {
        if (!state.isPlaying) setPlay(false)
    }}
    play={play}
    uris={trackUri ? [trackUri['uri']] : []}
    // styles={{
    //   activeColor: '#fff',
    //   bgColor: '#262626',
    //   color: '#fff',
    //   loaderColor: '#fff',
    //   sliderColor: '#0275d8 ',
    //   sliderHandleColor: '#fff',
    //   trackArtistColor: '#ccc',
    //   trackNameColor: '#fff',
    // }}
  />
}
