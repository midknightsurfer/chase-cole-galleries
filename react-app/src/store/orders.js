const LOAD_ORDERS = "orders/GET_ORDERS";
const NEW_ORDER = "orders/NEW_ORDER";
const UPDATE_STATUS = "orders/UPDATE_STATUS";


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

export const newOrder = (user_id, product_id, status) => async (dispatch) => {
  const response = await fetch("/api/orders", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id,
      product_id,
      status,
    }),
  });

  if (response.ok) {
    const order = await response.json();
    dispatch(newCart(order));
    return ["Created", order];
  }
};

const initialState = {};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_ORDER:
      const newState = {
        ...state,
        arr: [...state.arr, action.product.id],
      };
      return newState;
    case LOAD_ORDERS:
      const newObj = {};
      action.orders.orders.forEach((order) => {
        newObj[order.id] = order;

      });
      return newObj;
    default:
      return state;
  }
};

export default orderReducer;
