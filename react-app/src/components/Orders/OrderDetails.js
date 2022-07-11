import { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeOrder, editStatus } from "../../store/sold";
import { ModalContext } from "../../context/ModalContext";
import { getOrders } from "../../store/orders";


const OrderDetails = ({ product }) => {
  const [newStatus, setNewStatus] = useState(product.status);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const user = users.find((user) => user.id === product.buyer_id);

  let { handleModal, setModal } = useContext(ModalContext);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const cancelOrder = () => {
    dispatch(removeOrder(product.id));
    setModal(false);
  };

  const updateStatus = async (e) => {
    e.preventDefault();
    const data = {
      order_id: product.id,
      status: newStatus,
    };

    await dispatch(editStatus(data));

    setModal(false);
  };

  return (
    <div className="main-menu__bg">
      <div className="orders-details__modal">
        <h3>Order Details</h3>
        <div>Name: {user?.first_name} {user?.last_name}</div>
        <div>Email: {user?.email}</div>
        <div>Address: {user?.address}</div>
        <div>City: {user?.city}</div>
        <div>State: {user?.state}</div> 
        <div>Zipcode: {user?.zipcode}</div>
        <div>Phone: {user?.phone}</div>
        <i
          className="orders-details__close fas fa-times"
          onClick={() => setModal(false)}
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
