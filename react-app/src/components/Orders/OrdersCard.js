import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeOrder, editStatus } from "../../store/orders";

import "./Orders.css";

const OrdersCard = ({ products, id, status }) => {
  const [showModify, setShowModify] = useState(false);
  const [newStatus, setNewStatus] = useState(status);
  const dispatch = useDispatch();

  const cancelOrder = () => {
    dispatch(removeOrder(id));
  };

  const openModify = (e) => {
    setShowModify(!showModify);
  }

  const updateStatus = () => {

    
    const data = {
      order_id: id,
      status: newStatus
    }

    dispatch(editStatus(data))
    setShowModify(!showModify)
  }

  return (
    <>
      <div
        onClick={openModify}
        className="orders_singlecontainer"
      >
        <div>Order: {id}</div>
        {products.title}
        <div>Status: </div>
        <span>{status}</span>
      </div>
      {showModify && (
        <div className="main__menu-bg">
          <div className="orders__modifyModal">
          <i className="modifyclose fas fa-times" onClick={() => setShowModify(!showModify)}></i>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="product__form-category"
          >
            <option value="Processing">Processing</option>
            <option value="Accepted">Accepted</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
          <button onClick={updateStatus} >Update</button>
            <button onClick={cancelOrder}>Delete</button>{" "}

          </div>
        </div>
      )}
    </>
  );
};

export default OrdersCard;
