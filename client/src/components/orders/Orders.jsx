import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderData } from '../redux/requests/getOrderData';

const Orders = () => {
    const orderDetails = useSelector((state) => state.getOrder)
    const orders = orderDetails.order.allOrders;
    const user = useSelector((state) => state.getUser);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchOrderData(dispatch, user);
    }, [])
    return (
        <div>
            <h2>Current Orders</h2>
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
            ))}
        </div>
    );
};

export default Orders;
