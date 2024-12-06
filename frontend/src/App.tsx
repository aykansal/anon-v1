import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Builder } from './pages/Builder';
import { parseXml } from './steps';
import Landing from './pages/Landing';
// import Landing from './pages/Landing';

function App() {
  return (
<BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;