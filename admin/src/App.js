import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Orders from './components/orders/Orders';
import Login from './components/Login/Login';
import Menu from './components/menu/Menu'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/orders' element = {<Orders />} />
        </Routes>
        <Routes>
          <Route path='/availablility' element = {<Menu />} />
        </Routes>
        <Routes>
          <Route path='/login' element = {<Login />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
