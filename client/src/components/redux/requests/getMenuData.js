import axios from 'axios';
import getMenu from '../actions/menuAction';

export async function fetchMenuData(dispatch) {
    try {
        const response = await axios.get('http://localhost:5000/api/menu/get-menu', {
            headers: { "Content-Type": "application/json; charset=UTF-8" }
        });
        const data = response.data;
        dispatch(getMenu(data));
    } catch (error) {
        console.log("Error in fetching menu items");
    }
}
