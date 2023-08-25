import React from 'react';
const Cart = () => {
  const calculateTotal = () => {
    return cartItems?.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const cartItems = JSON.parse(localStorage.getItem("cart"));
  console.log(cartItems);
  
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
          {cartItems&&cartItems?.map((item, index) => (
            <tr key={index}>
              <td>{item?.name}</td>
              <td>₹{item?.price?.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>₹{(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right">
        <h4>Subtotal: ₹{calculateTotal()?.toFixed(2)}</h4>
      </div>
      <div className="mt-4">
        <button className="btn btn-primary">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
