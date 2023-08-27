const initialState = {
    user: {}
};
export default function getUserReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_USER":
            if (action.payload == null) {
                return state;
            }
            return {
                user: action.payload
            };
        default:
            return state;
    }
}