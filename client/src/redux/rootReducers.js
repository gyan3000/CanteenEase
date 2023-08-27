import { combineReducers } from "redux";
import getMenuReducer from "../components/redux/reducers/menuReducer";
import getUserReducer from "../components/redux/reducers/userReducer";


export default combineReducers({
    getMenu: getMenuReducer,
    getUser: getUserReducer
});