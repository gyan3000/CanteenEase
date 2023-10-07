import React, {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderData } from './../redux/requests/getOrderData';
import axios from 'axios';
import "./order.css"
import { toast } from 'react-toastify';

const Orders = () => {
  const orderDetails = useSelector((state) => state.getOrder)
  const orders = orderDetails.order;
  const admin = useSelector((state) => state.getAdmin);
  const dispatch = useDispatch();

  const markOrderAsDelivered = async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/order/mark-delivered/${orderId}`, {
        headers: { "Content-Type": "application/json; charset=UTF-8", "auth-token": admin.admin.authtoken },
      });
      console.log(response.data);
      toast.success(response.data);
    } catch (error) {
      console.error('Error marking order as delivered:', error);
      throw error;
    }
  };

  const renderOrders = () => {
    return orders?.map(order => (
      <div key={order.orderId} className="OrderCard">
        <p className="OrderDetails">Order Number: {order.orderNumber}</p>
        <p className="OrderDetails">User Name: {order.userName}</p>
        <p className="OrderDetails">Total Amount: ${order.totalAmount}</p>
        <p className="OrderDetails">Status: {order.status}</p>
        <p className="OrderDetails">Timestamp: {order.timestamp}</p>
        <p className="OrderDetails">Items:</p>
        <ul className="OrderItems">
          {order.items.map((item, index) => (
            <li key={index}>
              Name: {item.name}, Quantity: {item.quantity}
            </li>
          ))}
        </ul>
        {order.status !== 'Delivered' && (
          <button
            className="MarkAsDeliveredButton"
            onClick={() => markOrderAsDelivered(order.orderId)}
          >
            Mark as Delivered
          </button>
        )}
        <hr />
      </div>
    ));
  };
  useEffect(() => {
    fetchOrderData(dispatch, admin);
  }, [orders])

  return (
    <div className="Orders">
      <h2>Orders</h2>
      {orders?.length === 0 ? (
        <p>No orders available</p>
      ) : (
        renderOrders()
      )}
    </div>
  );
};

export default Orders;
