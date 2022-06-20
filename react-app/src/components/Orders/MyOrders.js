import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrdersCard from "./OrdersCard";

import './Orders.css'

const MyOrders = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => Object.values(state.orders));
  const user = useSelector((state) => state.session.user);


  return (
    <div>
      <h2>My Orders</h2>
      <div className="myorders__orderscontainer">
        <div className="myorders__sellerorder-container">
          <h3>Stuff I've Purchased</h3>
          {orders.map(
            (order) =>
              order.user_id === user.id && (            
              order.products.map(product => (
                <OrdersCard products={product.product} status={order.status} id={order.id} />
                
              ))

              )
          )}
        </div>
        <div className="myorders__buyerorder-container">
          <h3>Stuff I've Sold</h3>
          {orders.map(
            (order) =>
              order.products.map(product => (
                product.product.user_id === user.id && (
                  <OrdersCard products={product.product} status={order.status} id={order.id} />

                )
              )
              )
          )}          
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
