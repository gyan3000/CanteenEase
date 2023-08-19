import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Menu from './components/Menu'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
        <Route path="menu" element={<Menu />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
