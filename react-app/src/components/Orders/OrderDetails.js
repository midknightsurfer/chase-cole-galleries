import { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeOrder, editStatus } from "../../store/orders";
import { ModalContext } from "../../context/ModalContext";
import { getUsers } from "../../store/user";

const OrderDetails = ({ order }) => {
  const [newStatus, setNewStatus] = useState(order.status);
  const dispatch = useDispatch();
  const user = useSelector((state) =>
    state.user.users.find((user) => user.id === order.user_id)
  );
  let { handleModal } = useContext(ModalContext);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const cancelOrder = () => {
    dispatch(removeOrder(order.id));
    handleModal(<ContentComponent />);
  };

  const updateStatus = () => {
    const data = {
      order_id: order.id,
      status: newStatus,
    };

    dispatch(editStatus(data));
    handleModal(<ContentComponent />);
  };

  return (
    <div className="main-menu__bg">
      <div className="orders-details__modal">
        <h3>Order Details</h3>
        <div>Name: {user.first_name} {user.last_name}</div>
        <div>Email: {user.email}</div>
        <div>Address: {user.address}</div>
        <div>City: {user.city}</div>
        <div>State: {user.state}</div> 
        <div>Zipcode: {user.zipcode}</div>
        <div>Phone: {user.phone}</div>
        <i
          className="orders-details__close fas fa-times"
          onClick={() => handleModal(<ContentComponent />)}
        ></i>
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className="orders-details__category"
        >
          <option value="Processing">Processing</option>
          <option value="Accepted">Accepted</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
        <button onClick={updateStatus}>Update</button>
        <button onClick={cancelOrder}>Delete</button>{" "}
      </div>
    </div>
  );
};

export default OrderDetails;

function ContentComponent() {
  return <></>;
}
