import rfdc from "rfdc";

const clone = rfdc()

const LOAD_SOLD = "sold/LOAD_SOLD";
const UPDATE_STATUS = "sold/UPDATE_STATUS";
const DELETE = "sold/DELETE_ORDER"

const sold = (product) => {
  return {
    type: LOAD_SOLD,
    product,
  };
};

const updateOrder = (order) => {
  return {
      type: UPDATE_STATUS,
      order
  }
}

const deleteOrder = (order) => {
  return {
      type: DELETE,
      order
  }
}

export const getSold = (data) => async (dispatch) => {
  const response = await fetch(`/api/orders/sold/${data}`);

  if (response.ok) {
    const products = await response.json();
    dispatch(sold(products));
  }
};

export const editStatus = (data) => async (dispatch) => {
  const {order_id, status} = data;

  const response = await fetch(`/api/orders/${order_id}`,{
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
  })

  if(response.ok) {
      const order = await response.json()
      dispatch(updateOrder(order))
  }
}

export const removeOrder = (data) => async (dispatch) => {
  const response = await fetch(`api/orders/sold/${data}`,{
      method: "DELETE"
  })

  if(response.ok) {
      const order = await response.json()
      dispatch(deleteOrder(order))
  }
}

const initialState = {};

const soldReducer = (state = initialState, action) => {
  let newState = clone(state);
  switch (action.type) {
    case LOAD_SOLD:
      let soldObj = {};
      action.product.orders.forEach((product) => {
        soldObj[product.id] = product;
      });
      newState = soldObj;
      return newState;
    case UPDATE_STATUS:
      newState[action.order.id] = action.order
      return newState
    case DELETE:
      delete newState[action.order.id]
      return newState
    default:
      return state;
  }
};

export default soldReducer;
