const initialState = {
    order: {}
};
export default function getOrderReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_ORDER":
            if (action.payload == null) {
                return state;
            }
            return {
                order: action.payload
            };
        default:
            return state;
    }
}