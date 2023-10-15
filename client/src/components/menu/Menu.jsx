import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuCard from './MenuCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuData } from '../redux/requests/getMenuData';
import './Menu.css';

const Menu = () => {
  const menuItems = useSelector((state)=>state.getMenu)
  const dispatch = useDispatch();
  useEffect(()=>{
    fetchMenuData(dispatch);
  },[])
  return (
    <>
      <div className='menu-parent'>
        <div className="menu-container">
          {menuItems &&  menuItems?.menu?.map((item, index) => (
            <MenuCard
              key={index}
              id= {item._id}
              name={item.name}
              description={item.description}
              vegetarian={item.vegetarian}
              price={item.price}
              img={item.img}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Menu;

