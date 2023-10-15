import React, { useState, useEffect } from 'react';
import "./MenuCard.css";
import Card from 'react-bootstrap/Card';

const MenuCard = ({ id, name, description, vegetarian, price, img }) => {
    const [orderQuantity, setOrderQuantity] = useState(0);
    const cartkey = "cart";
    const saveCartToLocalStorage = (cartItems) => {
        localStorage.setItem(cartkey, JSON.stringify(cartItems));
    };

    const handleOrder = (increment) => {
        const newQuantity = orderQuantity + increment;
        setOrderQuantity(newQuantity);
        updateCartItem(newQuantity);
    };

    const updateCartItem = (newQuantity) => {
        const storedCartItems = JSON.parse(localStorage.getItem(cartkey)) || [];

        const existingItem = storedCartItems.find(item => item.id === id);

        if (existingItem) {
            const updatedCartItems = storedCartItems.map(item => {
                if (item.id === id) {
                    if (newQuantity < 1) {
                        return null; 
                    }
                    return { ...item, quantity: newQuantity };
                }
                return item;
            }).filter(item => item !== null);
            setOrderQuantity(newQuantity);
            saveCartToLocalStorage(updatedCartItems);
        }else {
            const newItem = {
                id: id,
                quantity: newQuantity,
                name: name,
                price: price
            };
            const updatedCartItems = [...storedCartItems, newItem];
            setOrderQuantity(newQuantity);
            saveCartToLocalStorage(updatedCartItems);
        }
    };
    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem(cartkey)) || [];
        const item = storedCartItems.find(item => item.id === id);
        if (item) {
            setOrderQuantity(item.quantity);
        }
    }, [id, cartkey]);


    return (
        <>
            <div className="card mx-2 my-3" style={{ width: "20rem", height: "100%" }}>
                <div className="card-img mx-2 my-2">
                    <img style={{borderRadius:"0.5rem" }} src={img} className="card-img-top" alt={name} />
                </div>
                <div className="card-body">
                    <div className='title-price'>
                        <div className='title mx-2'>
                            <h4 style={{ textAlign: "left"}}>{name}</h4>
                            <p style={{ textAlign: "left"}}>{description}</p>
                        </div>
                        <div className='price'>
                            ₹{price}
                        </div>
                    </div>
                    <div className='my-2' style={{ width: "18rem", border:"0.5px solid black", borderRadius:"2px"}}></div>
                    <div className="d-flex align-items-center justify-content-center">
                        {orderQuantity ? (
                            <>
                                <button
                                    className="btn bg-transparent"
                                    onClick={() => handleOrder(-1)}
                                >
                                    <h4><strong>-</strong></h4>
                                </button>
                                <button
                                    className="btn bg-transparent"
                                    onClick={() => handleOrder(-1)}
                                >
                                    <h5>{orderQuantity}</h5>
                                </button>
                                <button
                                    className="btn bg-transparent"
                                    onClick={() => handleOrder(1)}
                                >
                                    <h4><strong>+</strong></h4>
                                </button>
                            </>
                        ) : (
                            <button className="btn bg-transparent" onClick={() => handleOrder(1)}>
                                <h5><strong>ADD</strong></h5>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MenuCard;
