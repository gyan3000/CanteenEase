import React from 'react'

const MenuCard = ({ name, description, vegetarian, price, img }) => {
    return (
        <>
            <div className="card mx-2 my-3" style={{ width: "20rem" }}>
                <img src={img} className="card-img-top" alt={name} />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                    <a href="#" className="btn btn-primary">Order: {price}</a>
                </div>
            </div>
        </>
    )
}

export default MenuCard
