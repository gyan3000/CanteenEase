import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuData } from '../redux/requests/getMenuData';

const MenuItemCard = ({ item }) => {
  const [available, setAvailable] = useState(item.available);

  const toggleAvailability = () => {
    // Update the availability locally
    setAvailable(!available);

    // You should also dispatch an action to update the availability in your Redux store here.
    // dispatch(updateMenuAvailability(item.id, !available));
  };

  return (
    <div className="menu-item-card">
      <div>
        <h2>{item.name}</h2>
        <p>{item.description}</p>
      </div>
      <div>
        <p>Price: ${item.price}</p>
        <button onClick={toggleAvailability}>
          {available ? 'Available' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
};

const Menu = () => {
  const menuItems = useSelector((state) => state.getMenu).menu;
  const dispatch = useDispatch();

  useEffect(() => {
    fetchMenuData(dispatch);
  }, []);

  return (
    <div>
      {menuItems.map((item) => (
        <MenuItemCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default Menu;
