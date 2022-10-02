/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
// import './Home.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import CreateProject from './components/CreateProject';
import Errorpage from './components/ErrorProject';
import Sync from './components/Sync';
import Displayer from './components/Displayer';
import Visualizer from './components/Displayer/Visualizer';
import HI from './components/Displayer/Popups';

function App() { //Rename to Home later
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/create-project" element={<CreateProject />}></Route>
        <Route exact path="/sync" element={<Sync />}></Route>
        <Route exact path="/can-bus-displayer" element={<Displayer />}></Route>
        <Route exact path="/can-bus-visualizer" element={<Visualizer />}></Route>
        <Route exact path="/can-bus-hi" element={<HI />}></Route>
        <Route exact path="*" element={<Errorpage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;