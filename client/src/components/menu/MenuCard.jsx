import React, { useState, useEffect } from 'react';

const MenuCard = ({ key, id, name, description, vegetarian, price, img }) => {
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
            <div className="card mx-2 my-3" style={{ width: "20rem" }}>
                <img src={img} className="card-img-top" alt={name} />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                    <div className="d-flex align-items-center">
                        {orderQuantity ? (
                            <>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleOrder(-1)}
                                >
                                    -
                                </button>
                                <span className="mx-2">{orderQuantity}</span>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleOrder(1)}
                                >
                                    +
                                </button>
                            </>
                        ) : (
                            <a href="#" className="btn btn-primary" onClick={() => handleOrder(1)}>
                                Order: {price}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MenuCard;
