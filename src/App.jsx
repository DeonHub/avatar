import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Home from './Home';
import Test from './Test';
import LyricsViewer from './LyricsViewer';
import SpotifyPlayer from './SpotifyPlayer';
import BusinessSearch from './BusinessSearch';

const App = () => {

  return (
  
    <Router>
      <Routes>
      {/* Auth urls */}
     <Route path={`/avatar`} element={<Home />} />
     <Route path={`/test`} element={<Test />} />
     <Route path={`/lyrics-viewer`} element={<LyricsViewer />} />
     <Route path={`/spotify-player`} element={<SpotifyPlayer />} />
     <Route path={`/`} element={<BusinessSearch />} />


      </Routes>
    </Router>

  );
};

export default App;