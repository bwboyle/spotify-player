import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

const code = new URLSearchParams(window.location.search).get('code')

const clientId = "SPOTIFY_CLIENT_ID"

const AUTH_URL = 
  `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

function App() {

  return (
    <div>
      {code ? <Dashboard  code={code} /> : <Login authUrl={AUTH_URL}/>}
    </div>
  );
}

export default App;
