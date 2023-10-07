import axios from 'axios';
import getOrder from '../actions/orderAction';
import { toast } from 'react-toastify';

export async function fetchOrderData(dispatch, admin) {
    try {
        const response = await axios.get('http://localhost:5000/api/order/pending-orders', {
            headers: { "Content-Type": "application/json; charset=UTF-8","auth-token": admin.admin.authtoken },
        });
        const data = response.data;
        if(response.status === 200){
            dispatch(getOrder(data));
        }else{
            toast.error("Please Login first");
        }
    } catch (error) {
        console.log("Error in fetching your orders", error);
    }
}
