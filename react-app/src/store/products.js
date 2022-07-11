const LOAD = "products/LOAD";
const ADD_ONE = "products/ADD";
const EDIT = "products/EDIT";
const DELETE = "products/DELETE";

const load = (products) => ({
  type: LOAD,
  products,
});

const add = (product) => ({
  type: ADD_ONE,
  product,
});

const edit = (product) => ({
  type: EDIT,
  product,
});

const deleteProduct = (product) => ({
  type: DELETE,
  product,
});

export const getProducts = () => async (dispatch) => {
  const response = await fetch("/api/products");

  if (response.ok) {
    const products = await response.json();
    dispatch(load(products.products));
  }
};

export const addProduct =
  (user_id, title, description, category_id, price, shipping_price, sold) =>
  async (dispatch) => {
    const response = await fetch("/api/products", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        title,
        description,
        category_id,
        price,
        shipping_price,
        sold
      }),
    });

    if (response.ok) {
      const product = await response.json();
      dispatch(add(product));
      return ["Created", product];
    }
  };

export const editProduct = (data, productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const editedProduct = await response.json();
    dispatch(edit(editedProduct));
    return ["Created", editedProduct];
  }
};

export const editSold = (data, productId) => async (dispatch) => {
  const response = await fetch(`/api/products/sold/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify( data ), 
  });

  if (response.ok) {
    const editedProduct = await response.json();
    dispatch(edit(editedProduct));
    return ["Created", editedProduct];
  }
};

export const deleteProductId = (productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteProduct(data));
  }
};

export const uploadFile = (fileForm) => async (dispatch) => {
  const { product_id, file, newFile } = fileForm;
  const form = new FormData();
  form.append("file", file);
  form.append("product_id", product_id);
  form.append("newFile", newFile);


};

const initialState = {};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const allProducts = {};
      action.products.forEach((product) => {
        allProducts[product.id] = product;
      });
      return {
        ...state,
        ...allProducts,
      };
    case ADD_ONE:
      const newState = {
        ...state,
        [action.product.id]: action.product,
      };
      return newState;
    case EDIT:
      const editState = {
        ...state,
        [action.product.id]: action.product,
      };
      return editState;
    case DELETE: {
      const newState = {
        ...state,
      };
      delete newState[action.product.id];
      return newState;
    }
    default:
      return state;
  }
};

export default productReducer;
