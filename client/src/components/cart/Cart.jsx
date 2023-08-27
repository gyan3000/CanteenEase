import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const cartKey = "cart";

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCartItems(storedCartItems);
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const saveCartToLocalStorage = (cartItems) => {
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
    setCartItems(cartItems);
  };

  const updateCartItem = (newQuantity, id) => {
    try {
      const updatedCartItems = cartItems.map(item => {
        if (item.id === id) {
          const updatedQuantity = item.quantity + newQuantity;
          if (updatedQuantity < 1) {
            return null;
          }
          return { ...item, quantity: updatedQuantity };
        }
        return item;
      }).filter(item => item !== null);

      saveCartToLocalStorage(updatedCartItems);
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  return (
    <div className="container mx-2 my-5">
      <h2>Your Cart</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Item Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>₹{item.price.toFixed(2)}</td>
              <td>
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
              </td>
              <td>₹{(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right">
        <h4>Subtotal: ₹{calculateTotal().toFixed(2)}</h4>
      </div>
      <div className="mt-4">
        <Link className="btn btn-primary mx-2" to="/menu">
          Place Order
        </Link>
        <Link className="btn btn-primary mx-2" to="/menu">
          Add More Items
        </Link>
      </div>
    </div>
  );
};

export default Cart;
