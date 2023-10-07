const getOrder = (data) => dispatch => {
    dispatch({
        type: "GET_ORDER",
        payload: data
    });
};

export default getOrder;