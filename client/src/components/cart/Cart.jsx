import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './Cart.css';
import logo from './../../images/logo.png'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const cartKey = 'cart';
  const user = useSelector((state) => state.getUser);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCartItems(storedCartItems);
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const saveCartToLocalStorage = (cartItems) => {
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
    setCartItems(cartItems);
  };

  const updateCartItem = (newQuantity, id) => {
    try {
      const updatedCartItems = cartItems
        .map((item) => {
          if (item.id === id) {
            const updatedQuantity = item.quantity + newQuantity;
            if (updatedQuantity < 1) {
              return null;
            }
            return { ...item, quantity: updatedQuantity };
          }
          return item;
        })
        .filter((item) => item !== null);

      saveCartToLocalStorage(updatedCartItems);
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };
  const placeOrder = async () => {
    const storedCartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
    const body = {
      items: storedCartItems,
    };
    if (!storedCartItems.length) {
      toast.error('Add some items to the cart');
    } else {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/order/place-order',
          body,
          {
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'auth-token': user.user.authtoken,
            },
          }
        );
        if (response.status === 201) {
          toast.success(
            'Order Successful with order No.: ' +
              response.data.orderNumber
          );
          navigate('/menu');
          localStorage.setItem(cartKey, JSON.stringify([]));
          setCartItems([]);
        } else {
          toast.error('Error while ordering. Try Again!');
        }
      } catch (error) {
        console.log('Error In Placing Your Order', error);
      }
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <div className="card-items" key={index}>
            <img
              src={logo}
              alt={item.name}
            />
            <div className="card-text">
              <h5 className="card-title" style={{ textAlign: "left"}}><strong>{item.name}</strong></h5>
              <p className="card-text" style={{ textAlign: "left"}}>₹{item.quantity*item.price.toFixed(2)}</p>
            </div>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => updateCartItem(-1, item.id)}
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => updateCartItem(1, item.id)}
              >
                +
              </button>
            </div>
          </div>
        ))}   
      </div>     
      <div className="checkout">
        <div className="payment">
          <h5>Payment Details</h5>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 50}} aria-label="simple table">
              <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Sub Total
                    </TableCell>
                    <TableCell align="right">₹{calculateTotal().toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow                  >
                    <TableCell component="th" scope="row">
                      Delivery & Packing Fee
                    </TableCell>
                    <TableCell align="right">₹0</TableCell>
                  </TableRow>
                  <TableRow                  >
                    <TableCell component="th" scope="row">
                      <strong>Total</strong>
                    </TableCell>
                    <TableCell align="right"><strong>₹{calculateTotal().toFixed(2)}</strong></TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <button className='checkout-button' onClick={placeOrder}>CHECKOUT</button>
        {/* <div className="text-right">
          <h4>Subtotal: ₹{calculateTotal().toFixed(2)}</h4>
        </div>
        <div className="mt-4">
          <button
            type="button"
            className="btn btn-primary mx-2"
            onClick={placeOrder}
          >
            Place Order
          </button>
          <Link className="btn btn-primary mx-2" to="/menu">
            Add More Items
          </Link> */}
        {/* </div> */}
      </div>
          
    </div>
  );
};

export default Cart;
