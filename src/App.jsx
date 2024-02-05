import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import NextCard from "./Home/NextCard";
import Download from './Header/Download';
import History from "./Header/History"

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nextCard" element={<NextCard />} />
          <Route path="/downloads" element={<Download />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
