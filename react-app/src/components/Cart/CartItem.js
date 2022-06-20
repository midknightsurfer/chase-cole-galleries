import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCart } from '../../store/cart';

import "./cart.css";



const CartItem = ({ product }) => {
const dispatch = useDispatch();
 const removeHandler = () => {

  dispatch(removeCart(product, product.user_id))
} 

  return (
    <div className="cart__item">
      <div className="cart__item-img" style={{backgroundImage: `url(${product.product.images[0]})` }}>
      </div>
      <div className="cart__item-title">{product.product.title}</div>
      <div className="cart__item-price"><span>Price</span>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(product.product.price)}</div>
      <div className="cart__item-shippingprice"><span>Shipping Price</span>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(product.product.shipping_price)}</div>
      <div className="deleteBtn" onClick={removeHandler} title="remove from cart"><i className="fa-solid fa-trash-can"></i></div>
    </div>
  );
};

export default CartItem;
