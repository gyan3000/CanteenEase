import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from './../../images/logo.png'
import "./Navbar.css"

const Navbar = () => {
  const user = useSelector((state) => state.getUser).user;

  return (
    <div>
      <nav className="navbar-own" style={{" background": "transparent"}}>
        <div className="nav-container">
          <Link className="navbar-logo" to="/">
            <img src={logo} alt="" />
          </Link>
          <div className="items">
            <ul>
              <li className="nav-item">
                <Link className="nav-link active text-white" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active text-white" to="/menu">
                  Menu
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active text-white" to="/cart">
                  Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active text-white" to="/orders">
                  Track Order
                </Link>
              </li>
            </ul>                     
          </div>
        </div>
      </nav>
      {/* <div class="search-box">
        <input type="text" placeholder="Search Canteen"/>
        <button></button>
      </div> */}
    </div>
  );
};

export default Navbar;
