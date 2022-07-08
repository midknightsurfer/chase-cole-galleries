import rfdc from "rfdc";

const clone = rfdc()

const LOAD_ORDERS = "orders/GET_ORDERS";
const NEW_ORDER = "orders/NEW_ORDER";

const newCart = (order) => ({
  type: NEW_ORDER,
  order,
});

const getAllOrders = (orders) => {
  return {
    type: LOAD_ORDERS,
    orders,
  };
};

export const getOrders = (data) => async (dispatch) => {
  const response = await fetch(`/api/orders/${data}`);

  if (response.ok) {
    const orders = await response.json();
    dispatch(getAllOrders(orders));
  }
};

export const newOrder = (data) => async (dispatch) => {

  const response = await fetch("/api/orders", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  });

  if (response.ok) {
    
    const order = await response.json();

    dispatch(newCart(order));
    return ["Created", order];
  }
};

const initialState = {};

const orderReducer = (state = initialState, action) => {
  let newState = clone(state);
  switch (action.type) {
    case NEW_ORDER:
      newState[action.order.id] = action.order
      return newState
    case LOAD_ORDERS:
      const newObj = {}
      action.orders.orders.forEach((order)=>{
          newObj[order.id] = order
          const productObj = {}
          newObj[order.id].products.forEach((product)=>{
              productObj[product.id] = product
          })
          newObj[order.id].products = productObj
      })
      newState = newObj
      return newState
    default:
      return state;
  }
};

export default orderReducer;
