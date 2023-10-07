import { combineReducers } from "redux";
import getMenuReducer from "../components/redux/reducers/menuReducer";
import getAdminReducer from "../components/redux/reducers/adminReducer";
import getOrderReducer from "../components/redux/reducers/orderReducer";


export default combineReducers({
    getMenu: getMenuReducer,
    getAdmin: getAdminReducer,
    getOrder: getOrderReducer
});