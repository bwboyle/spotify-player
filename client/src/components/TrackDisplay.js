import React, { useState } from 'react'

export default function TrackDisplay({ track, lyrics }) {
  const [showLyrics, setShowLyrics] = useState(false);

  let songTitle;

  if (track !== undefined) {
    if (track.title.length > 38) {
      songTitle = track.title.substring(0,35) + '...'
    } else {
      songTitle = track.title
    }
  } else {
    songTitle = ""
  }

  if (showLyrics) {
    return (
      <>
        <div className='flex-grow-1 mb-2 mt-4 text-center' style={{ overflowY: "auto", whiteSpace: 'pre'  }}>
          {lyrics}
        </div>
        <button className='btn btn-link text-decoration-none btn-sm mb-2' onClick={(e) => setShowLyrics(false)}>
          Hide Lyrics
        </button>
      </>
      
    )
  } else {

    return (
      <div className='d-flex flex-grow-1 mt-4 mb-2 align-items-center justify-content-center'>
        {track !== undefined && (
          <div className='d-flex flex-column align-items-center'>

            <img className='shadow-lg rounded' src={track.displayAlbumUrl} style={{ height: "60%", width: "60%"}} />

            <div style={{ height: '12px' }}></div>

            <div className='text-center font-weight-bold'>
              
              <p style={{ fontWeight: '600', fontSize: 20, marginTop: 20, marginBottom: 8 }}>
                {songTitle}
              </p>
              <p className='text-muted' style={{ fontSize: 16, marginBottom: 4 }}>
                {track.artist}
              </p>
            </div>

            <button className='btn btn-link btn-sm text-decoration-none' onClick={(e) => setShowLyrics(true)}>
              Show Lyrics
            </button>

          </div>
        )}
      </div>
    )
  }
}
