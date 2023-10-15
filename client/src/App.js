<<<<<<< HEAD
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Menu from './components/menu/Menu'; 
import Cart from './components/cart/Cart';
import Login from "./components/Login/Login"
import Signup from './components/Login/Signup';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Orders from './components/orders/Orders';
import Profile from './components/profile/Profile';
import PaytmButton from './components/paytm-button/PaytmButton';
import Razor from './components/razorpay/Razor';

=======
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Menu from "./components/menu/Menu";
import Cart from "./components/cart/Cart";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Orders from "./components/orders/Orders";
import Profile from "./components/profile/Profile";
import Home from "./components/home/Home";
import "./App.css";
>>>>>>> c6612522353f4e5ff69d2168c8bf83cfd6cfc056

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
<<<<<<< HEAD
        <Razor />
        <Routes>
=======
        <Routes> 
          <Route path="/" element={<Home />} />
>>>>>>> c6612522353f4e5ff69d2168c8bf83cfd6cfc056
          <Route path="menu" element={<Menu />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
