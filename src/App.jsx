import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import NextCard from "./Home/NextCard";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nextCard" element={<NextCard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
