import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import OrderDetails from "./OrderDetails";

import "./Orders.css";

const OrdersCard = ({ order }) => {
  let { handleModal } = useContext(ModalContext);

  return (
    <>
      <div
        onClick={() => handleModal(<OrderDetails order={order} />)}
        className="orders-single__container"
      >
        <div>Order: {order.id}</div>
        {order.products.map((product) => (
          <div className="orders-product__container">
            {product.product_title}
            <span>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "USD",
              }).format(product.product.price)}{" "}
              +{" "}
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "USD",
              }).format(product.product.shipping_price)}
            </span>
          </div>
        ))}
        <div>
          Total:{" "}
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "USD",
          }).format(order.total)}
        </div>
        <div>Status: {order.status}</div>
      </div>
    </>
  );
};

export default OrdersCard;
