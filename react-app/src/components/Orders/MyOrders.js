import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OrdersCard from "./OrdersCard";
import PurchaseHistory from "./PurchaseHistory";
import { getOrders } from "../../store/orders";
import { getSold } from "../../store/sold";

import "./Orders.css";

const MyOrders = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const orders = useSelector((state) => Object.values(state.orders));
  const sold = useSelector((state) => Object.values(state.sold));

console.log(orders)
  useEffect(() => {
    dispatch(getOrders(user.id));
    dispatch(getSold(user.id));
  }, [dispatch, user.id]);


  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      <div className="orders-orders__container">
        <h3>Stuff I've Purchased</h3>
        <div className="orders-sold__container">
          {!orders.length ? <h4>Items you purchase will show up here</h4> : orders.map((order) => (
            <OrdersCard order={order} />
          ))}
        </div>
        <h3>Stuff I've Sold</h3>
        <div className="orders-purchases__container">
          {!sold.length ? <h4>Items you sell will show up here</h4> :
          Object.values(sold).map((product) =>
                <PurchaseHistory product={product} />
              )
            }
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
