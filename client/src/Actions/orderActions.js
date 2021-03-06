import {
  GET_ORDERS_EMPLOYEE,
  GET_ORDERS,
  GET_ORDER,
  ADD_ORDERS,
  DELETE_ORDER,
  PRE_ORDER,
  DELETE_PRE_ORDER,
  UPDATE_ORDER,
  ORDERS_LOADING
} from "../Types/orderTypes";

export const getOrdersEmployee = id => dispatch => {
  dispatch(setOrdersLoading());
  fetch(`/orders/employee/${id}`)
    .then(res => res.json())
    .then(res => {
      sessionStorage.setItem("orders", JSON.stringify(res));
      dispatch({ type: GET_ORDERS_EMPLOYEE, payload: res });
    })
    .catch(error => {
      console.error("Error:", error);
    });
};

export const getOrders = id => dispatch => {
  dispatch(setOrdersLoading());
  fetch(`/orders`)
    .then(res => res.json())
    .then(res => {
      sessionStorage.setItem("orders", JSON.stringify(res));
      dispatch({ type: GET_ORDERS, payload: res });
    })
    .catch(error => {
      console.error("Error:", error);
    });
};

export const addOrders = orders => dispatch => {
  dispatch(setOrdersLoading());
  // console.log("ORDERS BEING SENT BY ACTIONS==>>", orders);
  dispatch(setOrdersLoading());
  orders.forEach(order => {
    fetch("/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    }).then(response => {
      console.log(response);
    });
  });
};

export const deleteOrder = id => dispatch => {
  dispatch(setOrdersLoading());

  fetch(`/orders/${id}`, {
    method: "DELETE"
  })
    .then(response => {
      return response.json();
    })
    .then(response => {
      dispatch({ type: DELETE_ORDER, payload: response });
    });
};

export const setOrdersLoading = () => {
  return {
    type: ORDERS_LOADING
  };
};

export const preOrder = order => dispatch => {
  dispatch(setOrdersLoading());
  let cart = [];
  cart.push(order);
  if (sessionStorage.getItem("cart") === null) {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  } else {
    let oldCart = JSON.parse(sessionStorage.getItem("cart"));
    if (oldCart.includes(order) === false) {
      let newCart = [...oldCart, ...cart];
      sessionStorage.setItem("cart", JSON.stringify(newCart));
    }
  }
  dispatch({ type: PRE_ORDER, payload: order });
};

export const deletePreOrder = id => dispatch => {
  dispatch(setOrdersLoading());
  let oldCart = JSON.parse(sessionStorage.getItem("cart"));
  let newCart = oldCart.filter(item => {
    return item._id !== id;
  });
  sessionStorage.setItem("cart", JSON.stringify(newCart));

  dispatch({ type: PRE_ORDER, payload: id });
};
