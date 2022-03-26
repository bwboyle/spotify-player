import React from 'react';

export default function TrackSearchResult({ track, chooseTrack }) {

  function handlePlay() {
    chooseTrack(track);
  } 
  
  let songTitle;

  if (track !== "") {
    if (track.title.length > 50) {
      songTitle = track.title.substring(0,47) + '...'
    } else {
      songTitle = track.title
    }
  } else {
    songTitle = ""
  }

  return (
    <div 
        className='d-flex m-2 align-items-center' 
        style={{ cursor: "pointer" }}
        onClick={handlePlay}
    >
        <img src={track.albumUrl} style={{ height: "64px", width: "64px"}} />
        <div className='m-2'>
            <div>{songTitle}</div>
            <div className='text-muted'>{track.artist}</div>
        </div>
    </div>
  );
}
