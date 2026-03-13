import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Home from './Home';
import Test from './Test';
import LyricsViewer from './LyricsViewer';
import SpotifyPlayer from './SpotifyPlayer';
import BusinessSearch from './BusinessSearch';
import SocialAuth from './Auth/SocialAuth';
import AuthSuccess from './Auth/AuthSuccess';
import Editor from './pixora/pages/Editor';
import Download from './Download';


const App = () => {

  return (
  
    <Router>
      <Routes>
      {/* Auth urls */}
     <Route path={`/avatar`} element={<Home />} />
     <Route path={`/test`} element={<Test />} />
     <Route path={`/lyrics-viewer`} element={<LyricsViewer />} />
     <Route path={`/spotify-player`} element={<SpotifyPlayer />} />
     <Route path={`/business`} element={<BusinessSearch />} />
     <Route path={'/social-auth'} element={<SocialAuth />} />
     <Route path={'/auth-success'} element={<AuthSuccess />} />
     <Route path={'/editor'} element={<Editor />} />
     <Route path={'/'} element={<Download />} />

      {/* Add other routes as needed */}


      </Routes>
    </Router>

  );
};

export default App;