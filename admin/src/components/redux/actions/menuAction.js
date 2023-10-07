const getMenu = (data) => dispatch => {
    dispatch({
        type: "GET_MENU",
        payload: data
    });
};

export default getMenu;