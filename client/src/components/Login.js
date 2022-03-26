import React from 'react';
import { Container } from 'react-bootstrap'

export default function Login({ authUrl }) {

  return (
    <Container 
        className='d-flex flex-column justify-content-center align-items-center'
        style={{ minHeight: '100vh'}}
    >
        <div className='mb-4 h2 text-center lh-base'>
          Your favorite Spotify tracks. <br />
          All from your favorite web browser
        </div>

        <a href={authUrl} className='rounded-pill btn btn-lg btn-success mt-2 py-2 px-4' >
          Start Listening
        </a>
    </Container>
  );
}

