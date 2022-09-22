/* eslint-disable jsx-a11y/alt-text */
import './Home.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import CreateProject from './components/CreateProject';
import Errorpage from './components/ErrorProject';
import Sync from './components/Sync';

function App() { //Rename to Home later
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/createproject" element={<CreateProject />}></Route>
        <Route exact path="/sync" element={<Sync />}></Route>
        <Route exact path="*" element={<Errorpage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;