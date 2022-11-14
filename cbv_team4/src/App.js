import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home/Home';
import CreateProject from './components/CreateProject/CreateProject';
import Sync from './components/Sync/Sync';
import Visualizer from './components/Displayer/Visualizer/Visualizer';
import Visualizer2 from './components/Displayer/Visualizer/Visualizer2';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/create-project" element={<CreateProject />}></Route>
        <Route exact path="/sync" element={<Sync />}></Route>
        <Route exact path="/can-bus-visualizer" element={<Visualizer />}></Route>
        <Route exact path="/can-bus-visualizer2" element={<Visualizer2 />}></Route>
      </Routes>
    </Router>
  );
}

export default App;