import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuCard from './MenuCard';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    async function fetchMenuItems() {
      try {
        const response = await axios.get('http://localhost:5000/api/menu/get-menu');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    }

    fetchMenuItems();
  }, []);

  return (
    <div className="menu-container d-flex flex-wrap align-content-start justify-content-around">
      {menuItems.map(item => (
        <MenuCard
          key={item._id}
          name={item.name}
          description={item.description}
          vegetarian={item.vegetarian}
          price={item.price}
          img={item.img}
        />
      ))}
    </div>
  );
}

export default Menu;

