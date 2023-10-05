import { combineReducers } from "redux";
import getMenuReducer from "../components/redux/reducers/menuReducer";
import getUserReducer from "../components/redux/reducers/userReducer";
import getOrderReducer from "../components/redux/reducers/orderReducer";


export default combineReducers({
    getMenu: getMenuReducer,
    getUser: getUserReducer,
    getOrder: getOrderReducer
});