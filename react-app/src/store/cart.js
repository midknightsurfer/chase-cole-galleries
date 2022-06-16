import rfdc from "rfdc";
const clone = rfdc();

const LOAD_CART = "cart/LOAD_CART";
const ADD_TO_CART = "cart/ADD_TO_CART";
const REMOVE_FROM_CART = "cart/REMOVE_FROM_CART";
const EMPTY_CART = "cart/EMPTY_CART";

const load = (cart) => {
  return {
    type: LOAD_CART,
    cart,
  };
};

const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    product,
  };
};

const removeFromCart = (product) => {
  return {
      type: REMOVE_FROM_CART,
      product
  }
}

export const emptyCart = () => {
  return {
      type: EMPTY_CART,
  }
}

export const getCart = (data) => async (dispatch) => {
  const data = 1;
  const res = await fetch(`/api/carts/${data}`);

  if (res.ok) {
    const cart = await res.json();
    dispatch(load(cart));
  }
};

export const addCart = (data) => async (dispatch) => {
  const res = await fetch(`/api/carts/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  });

  if (res.ok) {
    const cartItem = await res.json();
    dispatch(addToCart(cartItem));
  }
};

export const removeCart = (product, cartUserId) => async (dispatch) => {
  const cartProductId = product.product_id
  const res = await fetch (`/api/carts/${cartUserId}/${cartProductId}`, {
      method:"DELETE",
  })
  if(res.ok) {
      const cart_item = await res.json()
      dispatch(removeFromCart(cart_item))
  }
}

export const clear = (cartUserId) => async(dispatch) => {
  const res = await fetch(`/api/carts/${cartUserId}`,{
      method:"DELETE"
  })
  if(res.ok){
      dispatch(emptyCart())
  }
}

const initialState = { cartTotal: {}, products: {} };

const cartReducer = (state = initialState, action) => {
  let newState = clone(state);
  switch (action.type) {
    case LOAD_CART:
      action.cart.cart_items.forEach((product) => {
        newState.products[product.id] = product;
        newState.cartTotal[product.id] =
          product.product.price + product.shipping_price;
      });
      return newState    
    case ADD_TO_CART:
      newState.products[action.product.id] = action.product;
      newState.cartTotal[action.product.id] =
        action.product.product.shipping_price + action.product.product.price;
      return newState
    case REMOVE_FROM_CART:
      delete newState.products[action.product.id]
      delete newState.cartTotal[action.product.id]
      return newState
    case EMPTY_CART:
      return initialState
    default:      
      return state;
  }
};

export default cartReducer;
