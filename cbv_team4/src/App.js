import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home/Home';
import CreateProject from './components/CreateProject/CreateProject';
import Sync from './components/Sync/Sync';
import Visualizer from './components/Displayer/Visualizer/Visualizer';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/create-project" element={<CreateProject />}></Route>
        <Route exact path="/sync" element={<Sync />}></Route>
        <Route exact path="/can-bus-visualizer" element={<Visualizer />}></Route>
      </Routes>
    </Router>
  );
}

export default App;