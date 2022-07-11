import { useContext, useState, useEffect } from "react";
import { ModalContext } from "../../context/ModalContext";
import OrderDetails from "./OrderDetails";

const PurchaseHistory = ({ product }) => {
  let { handleModal } = useContext(ModalContext);
console.log(product)
  return (
    <div
      onClick={() => handleModal(<OrderDetails product={product} />)}
      className="orders-purchases__singlecontainer"
    >
      <div
        className="orders-purchases__img"
        style={{ backgroundImage: `url('${product.product.images[0]}')` }}
      ></div>
      <span>Order: {product.order_id}</span>
      <span>{product.product_title}</span>
      <span>
        Price:{" "}
        {new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
        }).format(product.product.price)}{" "}
      </span>
      <span></span>Shipping:{" "}
      {new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "USD",
      }).format(product.product.shipping_price)}{" "}
      <span>
        Total:{" "}
        {new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
        }).format(product.product.price + product.product.shipping_price)}{" "}
      </span>
      <span>Status: {product.status}</span>
    </div>
  );
};

export default PurchaseHistory;
