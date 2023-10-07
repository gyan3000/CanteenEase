import axios from 'axios';
import getAdmin from '../actions/adminAction';
import { toast } from 'react-toastify';

export async function fetchAdminDataSignup(dispatch, body) {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/admin/signup', body, {
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        });
        const data = response.data;
        if(data.success){
            dispatch(getAdmin({...body,...data}));
            window.location = "/";
            toast.success("SignUp Successful");
        }else{
            toast.error("Error in Creating account");
        }
    } catch (error) {
        console.log("Error in signup");
    }
}
export async function fetchAdminDataLogin(dispatch, body) {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/admin/login',body, {
            headers: { "Content-Type": "application/json; charset=UTF-8" },
        });
        const data = response.data;
        if(data.success){
            dispatch(getAdmin(data));
            window.location = "/";
            toast.success("Login Successful");
        }else{
            toast.error("Please Enter the correct credentials");
        }
    } catch (error) {
        console.log("Error in login", error);
    }
}
