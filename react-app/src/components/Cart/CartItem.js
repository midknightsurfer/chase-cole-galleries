import { useDispatch } from "react-redux";
import { removeCart } from "../../store/cart";
import { editSold } from "../../store/products";

import "./cart.css";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    const data = {
      sold: false,
    };

    dispatch(editSold(data, product.product_id));
    dispatch(removeCart(product, product.user_id)); 
  } 

  return (
    <div className="cart-item">
      <div
        className="cart-item__img"
        style={{ backgroundImage: `url(${product.product.images[0]})` }}
      ></div>
      <div className="cart-item__title">{product.product.title}</div>
      <div className="cart-item__price">
        <span>Price</span>
        {new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
        }).format(product.product.price)}
      </div>
      <div className="cart-item__shippingprice">
        <span>Shipping Price</span>
        {new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
        }).format(product.product.shipping_price)}
      </div>
      <div
        className="delete-btn"
        onClick={removeFromCart}
        title="remove from cart"
      >
        <i className="fa-solid fa-trash-can"></i>
      </div>
    </div>
  );
};

export default CartItem;
