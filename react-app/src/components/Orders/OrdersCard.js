import { useContext } from "react";

import "./Orders.css";

const OrdersCard = ({ order }) => {

  return (
    <>
      <div
        className="orders-single__container"
      >
        <div>Order: {order?.id}</div>
        {Object.values(order?.products).map((product) => (
          <div className="orders-product__container">
            {product?.product_title}
            <span>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "USD",
              }).format(product?.product.price)}{" "}
              +{" "}
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "USD",
              }).format(product?.product.shipping_price)}
            </span>
            <span>Status: {product?.status}</span>
          </div>
        ))}
        <div>
          Total:{" "}
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "USD",
          }).format(order?.total)}
        </div>
      </div>
    </>
  );
};

export default OrdersCard;
