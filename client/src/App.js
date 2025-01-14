import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Menu from './components/menu/Menu';
import Cart from './components/cart/Cart';
import Login from "./components/Login/Login"
import Signup from './components/Login/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Orders from './components/orders/Orders';
import Profile from './components/profile/Profile';
import Home from "./components/home/Home"
import "./App.css";
import Loader from './components/loader/Loader';

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []); 

  return (
    <Router>
      <div className="App">
        {loading ? <Loader /> : <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="menu" element={<Menu />} />
            <Route path="cart" element={<Cart />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="orders" element={<Orders />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
          <ToastContainer />
        </>}
      </div>
    </Router>
  );
}

export default App;
