import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderData } from '../redux/requests/getOrderData';
import './Orders.css'
import logo from './../../images/logo.png';

const Orders = () => {
    const orderDetails = useSelector((state) => state.getOrder)
    const orders = orderDetails.order.allOrders;
    const user = useSelector((state) => state.getUser);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchOrderData(dispatch, user);
    }, [])
    return (
        <div className='box-parent'>
            <div className='box-container'>
                {orders?.map((ord, index) => (
                    <div className="box">
                        <div className="card">
                            <div className="overlap-group">
                            <div className="scrolling-window"/>
                                <div className="overlap">                                    
                                    {(ord.items).map((order, index) => (
                                        <div className="item-card">
                                            <div className="item">{order.name}</div>
                                            <div className="cost">{order.price*order.quantity}</div>
                                            <div className="quantity">{order.quantity}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="total-grand-no"> ₹{ord.totalAmount}</div>
                                <div className="orderno">{ord.orderNumber}</div>
                                <div className="order-number">Order No.</div>
                                <div className="text-wrapper-2">Grand Total</div>
                                <div className="overlap-2">
                                    <div className="ordered-at">Ordered At:</div>
                                    <div className="ordered-at-time">10:30</div>
                                </div>
                                <div className="delivery-status">{ord.status}</div>
                                <div className="line"></div>
                                <img className="logo-without-back" alt="Logo without back" src={logo} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* <div className='box-container'>
                {orders?.map((ord, index) => (
                    <div className="box">
                        <div className="card">
                            <div className="overlap-group">
                            <div className="overlap">
                                {(ord.items).map((order, index) => (
                                    <div className="item-card">
                                    <div className="item">{order.name}</div>
                                    <div className="cost">{order.price*order.quantity}</div>
                                    <div className="quantity">{order.quantity}</div>
                                </div>
                                ))}
                            </div>
                            <div className="total-grand-no">{ord.totalAmount}</div>
                            <div className="orderno">{ord.orderNumber}</div>
                            <div className="order-number">Order No.</div>
                            <div className="text-wrapper-2">Grand Total</div>
                            <div className="overlap-2">
                                <div className="ordered-at">Ordered At:</div>
                                <div className="ordered-at-time">{ord.timestamp}</div>
                            </div>
                            <div className="delivery-status">{ord.status}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div> */}
            {/* <h2>Current Orders</h2>
            {orders?.map((ord, index) => (
                <div className='mx-3 my-5'>
                <table className="table" key={index}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(ord.items).map((order, index) => (
                            <tr key={index}>
                                <td>{order.name}</td>
                                <td>{order.quantity}</td>
                                <td>{order.price}</td>
                                <td>{order.price*order.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                    <div>
                        <h6>Order Number: {ord.orderNumber}</h6>
                        <h6>Grand Total: {ord.totalAmount}</h6>
                        <h6>Ordered Time: {ord.timestamp}</h6>
                        <h6>Status: {ord.status}</h6>
                    </div>
                </div>
            ))} */}
        </div>
    );
};

export default Orders;
