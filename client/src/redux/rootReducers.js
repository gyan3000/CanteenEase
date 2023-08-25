import { combineReducers } from "redux";
import getMenuReducer from "../components/redux/reducers/menuReducer";


export default combineReducers({
    getMenu: getMenuReducer
});