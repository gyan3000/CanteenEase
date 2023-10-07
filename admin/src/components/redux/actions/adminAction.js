const getAdmin = (data) => dispatch => {
    dispatch({
        type: "GET_ADMIN",
        payload: data
    });
};

export default getAdmin;