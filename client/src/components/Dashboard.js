import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Button, Container, Form } from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node';

import TrackSearchResult from './TrackSearchResult';
import Player from './Player';
import TrackDisplay from './TrackDisplay';
import axios from 'axios';

const spotifyApi = new SpotifyWebApi({
  clientId: 'e953e7f016794c07a2ea4b7e77aab021',
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([""]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch('')
    setLyrics('')
  }

  // Access Token Hook
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // Search hook
  useEffect(() => {

    // Set search results to empty array if no search or acces tokem
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;

    // API search call
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return;

      // Map each track from response
      setSearchResults(res.body.tracks.items.map(track => {

        // Smallest album image from list of images
        const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
          if (image.height < smallest.height) return image;
          return smallest;
        }, track.album.images[0]);

        // Largest album image from list of images
        const largestAlbumImage = track.album.images.reduce((largest, image) => {
          if (image.height > largest.height) return image;
          return largest;
        }, track.album.images[0]);
        
        // Song object returned
        return {
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: smallestAlbumImage.url,
          displayAlbumUrl: largestAlbumImage.url,
        }
      }));
    });

    return () => cancel = true;

  }, [search, accessToken]);
  
  // Lyrics hook
  useEffect(() => {
    if (!playingTrack) return

    axios.get('http://localhost:3001/lyrics', {
      params: {
        track: playingTrack.title,
        artist: playingTrack.artist,
      }
    }).then(res => {
      setLyrics(res.data.lyrics)
    });
  }, [playingTrack]);
  

  return (
    <Container 
      className='d-flex flex-column pb-3 pt-4' 
      style={{ height: "100vh" }}
    >
      <Form.Control 
        type='search' 
        placeholder='Search Songs, Artists...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='shadow-lg border-0 p-2'
        // style={{ color: '#fff', background: '#262626' }}
        //style={{ padding: 10 }}
      />

      {searchResults.length !== 0 && (
        <div className='flex-grow-1 my-2' style={{ overflowY: "auto" }}>
          {searchResults.map(track => (
            <TrackSearchResult track={track} chooseTrack={chooseTrack} key={track.uri} />
          ))}
        </div>
      )}

      {searchResults.length === 0 && (<TrackDisplay track={playingTrack} lyrics={lyrics} />)}
      
      <div><Player accessToken={accessToken} trackUri={playingTrack}/></div>
    </Container>
  );
}
