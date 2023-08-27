const getUser = (data) => dispatch => {
    dispatch({
        type: "GET_USER",
        payload: data
    });
};

export default getUser;