import axios from 'axios';
import getOrder from '../actions/orderAction';
import { toast } from 'react-toastify';

export async function fetchOrderData(dispatch, user) {
    try {
        const response = await axios.get('http://localhost:5000/api/order/your-orders', {
            headers: { "Content-Type": "application/json; charset=UTF-8","auth-token": user.user.authtoken },
        });
        const data = response.data;
        if(response.status === 200){
            // console.log(data);
            dispatch(getOrder(data));
        }else{
            toast.error("Please Login first");
        }
    } catch (error) {
        console.log("Error in fetching your orders", error);
    }
}
