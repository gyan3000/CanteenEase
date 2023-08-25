const initialState = {
    menu: []
};
export default function getMenuReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_MENU":
            if (action.payload == null) {
                return state;
            }
            return {
                menu: action.payload
            };
        default:
            return state;
    }
}