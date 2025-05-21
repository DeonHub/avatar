import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Home from './Home';
import Test from './Test';
import LyricsViewer from './LyricsViewer';

const App = () => {

  return (
  
    <Router>
      <Routes>
      {/* Auth urls */}
     <Route path={`/`} element={<Home />} />
     <Route path={`/test`} element={<Test />} />
     <Route path={`/lyrics-viewer`} element={<LyricsViewer />} />


      </Routes>
    </Router>

  );
};

export default App;