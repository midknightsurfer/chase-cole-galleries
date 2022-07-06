import { useSelector } from "react-redux";
import OrdersCard from "./OrdersCard";
import PurchaseHistory from "./PurchaseHistory";

import "./Orders.css";

const MyOrders = () => {
  const orders = useSelector((state) => Object.values(state.orders));
  const user = useSelector((state) => state.session.user);

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      <div className="orders-orders__container">
        <h3>Stuff I've Sold</h3>
        <div className="orders-sold__container">
          {orders.map((order) => (
            order.user_id === user.id (
            <OrdersCard
              key={order.id} order={order}
            />
          )))}
        </div>
          <h3>Stuff I've Purchased</h3>        
        <div className="orders-purchases__container">
          {orders.map(
            (order) =>
              order.products.map((product) => (
                product.product.user_id === user.id ? ( 
                <PurchaseHistory
                  key={product.id}
                  product={product.product}
                  status={order.status}
                />
              ) : null))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
