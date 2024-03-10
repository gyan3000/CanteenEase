import axios from 'axios';
import getUser from '../actions/userAction';
import { toast } from 'react-toastify';

export async function fetchUserDataSignup(dispatch, body) {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/signup', body, {
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        });
        const data = response.data;
        if(data.success){
            window.location = "/login";
            toast.success("SignUp Successful, Now Login");
        }else{
            toast.error("Error in Creating account");
        }
    } catch (error) {
        console.log("Error in signup");
    }
}
export async function fetchUserDataLogin(dispatch, body) {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login',body, {
            headers: { "Content-Type": "application/json; charset=UTF-8" },
        });
        const data = response.data;
        if(data.success){
            dispatch(getUser(data));
            window.location = "/menu";
            toast.success("Login Successful");
        }else{
            toast.error("Please Enter the correct credentials");
        }
    } catch (error) {
        console.log("Error in login", error);
    }
}
