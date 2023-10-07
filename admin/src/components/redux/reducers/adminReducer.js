const initialState = {
    admin: {}
};
export default function getAdminReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_ADMIN":
            if (action.payload == null) {
                return state;
            }
            return {
                admin: action.payload
            };
        default:
            return state;
    }
}