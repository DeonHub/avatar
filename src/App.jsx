import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Home from './Home';
import Test from './Test';

const App = () => {

  return (
  
    <Router>
      <Routes>
      {/* Auth urls */}
     <Route path={`/`} element={<Home />} />
     <Route path={`/test`} element={<Test />} />


      </Routes>
    </Router>

  );
};

export default App;