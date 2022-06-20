import { useState, useEffect } from "react";
import CartView from "./CartView";
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../store/user";
import { newOrder } from "../../store/orders";
import { clear } from "../../store/cart"

import "./cart.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const cartTotal = useSelector((state) => Object.values(state.cart.cartTotal));
  const cart = useSelector((state)=> state.cart)



  const [showShipping, setShowShipping] = useState(true);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [address, setAddress] = useState(user.address);
  const [state, setState] = useState(user.state);
  const [city, setCity] = useState(user.city);
  const [zipcode, setZipcode] = useState(user.zipcode);

  const editShipping = () => {
    setShowShipping(!showShipping);
    setShowShippingForm(!showShippingForm);
  };


  const getTotal = () => {
    const inital = 0;
    const myCartTotal = Object.values(cartTotal).reduce(
      (accum, curr) => accum + curr,
      inital
    );
    return myCartTotal;
  };


  const submitHandler = (e) => {
    e.preventDefault()
    const cartItems = Object.values(cart.products)

    const data = {
      user_id: user.id,
      status: "Processing",
      products: cartItems,
      total: getTotal()
    }

    dispatch(newOrder(data))
    dispatch(clear(user.id))
    history.push("/myorders")
}

  const handleSave = async (e) => {
    e.preventDefault();

    const data = {
      user_id: user.id,
      address,
      city,
      state,
      zipcode
    };

    const productData = await dispatch(updateUser(data, user.id));

    setShowShipping(!showShipping);
    setShowShippingForm(!showShippingForm);  
  };

  return (
    <div className="checkout__container">
      <h2>Checkout</h2>
      <div className="checkout__cart-container">
        <CartView />
      </div>
      <div className="checkout__shipping-details">
        <h3>Shipping Details</h3>
        <div>
          Name: {user.first_name} {user.last_name}
        </div>
        {showShipping && (
          <>
            <div>Address: {address}</div>
            <div>
              City: {city} State: {state} Zipcode: {zipcode}
            </div>

            <button onClick={editShipping}>Update Shipping Info</button>
          </>
        )}
        {showShippingForm && (
          <div className="checkout__shippingform">
            <form onSubmit={handleSave}>
              <label className="label">Address:</label>
              <input
                name="address"
                type="input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              ></input>
              <label className="label">City:</label>
              <input
                name="city"
                type="input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              ></input>
              <label className="label">State:</label>
              <select
                name="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">Choose a State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
              <label className="label">Zipcode:</label>
              <input
                name="zipcode"
                type="number"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                required
              ></input>
              <button type="submit">Save</button>
            </form>
          </div>
        )}
      </div>
      <form onSubmit={submitHandler}>
      <div className="checkout__confirm">
        <div>Total: {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(getTotal())}</div>
        <button type="submit">Confirm Order</button>
      </div>        
      </form>

    </div>
  );
};

export default Checkout;
