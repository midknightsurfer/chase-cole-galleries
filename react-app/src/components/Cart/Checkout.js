import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../store/user";
import { newOrder } from "../../store/orders";
import { clear } from "../../store/cart";
import CartItem from "./CartItem";

import "./cart.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const cartTotal = useSelector((state) => Object.values(state.cart.cartTotal));
  const cart = useSelector((state) => Object.values(state.cart.products));

  const [showShipping, setShowShipping] = useState(true);
  const [showShippingForm, setShowShippingForm] = useState(false);

  const [address, setAddress] = useState(user.address);
  const [state, setState] = useState(user.state);
  const [city, setCity] = useState(user.city);
  const [zipcode, setZipcode] = useState(user.zipcode);
  const [phone, setPhone] = useState(user.phone);

  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = [];
    setHasSubmitted(false);
    if (!address) {
      errors.push("Address is required");
    }
    if (!state) {
      errors.push("State is required");
    }
    if (!city) {
      errors.push("City is required");
    }
    if (!zipcode) {
      errors.push("Zipcode is required");
    }
    if (zipcode && (zipcode.length > 5 || zipcode.length < 5)) {
      errors.push("Zip Code must be 5 digits");
    }
    if (!phone) {
      errors.push("Phone is required");
    }
    if (phone && phone.length !== 10) {
      errors.push("Phone must be 10 digits");
    }
    setValidationErrors(errors);
  }, [address, city, state, zipcode, phone, showShippingForm]);

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
    e.preventDefault();

    setHasSubmitted(true);
    if (validationErrors.length) return;

    const cartItems = cart;

    const data = {
      user_id: user.id,
      status: "Processing",
      products: cartItems,
      total: getTotal(),
    };

    dispatch(newOrder(data));
    dispatch(clear(user.id));

    setValidationErrors([]);
    setHasSubmitted(false);

    history.push("/myorders");
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const data = {
      user_id: user.id,
      address,
      city,
      state,
      zipcode,
      phone,
    };

    await dispatch(updateUser(data, user.id));

    setShowShipping(!showShipping);
    setShowShippingForm(!showShippingForm);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setShowShipping(!showShipping);
    setShowShippingForm(!showShippingForm);
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {cart?.length === 0 ? (
        history.push("/")
      ) : (
        <div className="checkout-cart__container">
          <h3>Cart</h3>
          {cart?.map((product) => {
            return (
              <div key={product.id}>
                <CartItem product={product} />
              </div>
            );
          })}{" "}
        </div>
      )}
      <div className="checkout-shipping__details">
        <h3>Shipping Details</h3>
        <p>
          A valid shipping address and phone number are required for purchase
        </p>
        <div>
          Name: {user.first_name} {user.last_name}
        </div>
        {showShipping && (
          <>
            <div>Address: {address}</div>
            <div>
              City: {city} State: {state} Zipcode: {zipcode}
            </div>
            <div>Phone: {phone}</div>

            <button onClick={editShipping}>Update Shipping Info</button>
            {hasSubmitted && validationErrors.length > 0 && (
          <div className="errors">
            The following errors were found:
            <ul>
              {validationErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
          </>
        )}
        {showShippingForm && (
          <div className="checkout-shipping__form">
            <form onSubmit={handleSave}>            
            <div>
              <label className="label">Address:</label>
              <input
                name="address"
                type="input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></input>
            </div>
            <div>
              <label className="label">City:</label>
              <input
                name="city"
                type="input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></input>              
            </div>
            <div>
              <label className="label">State: </label>
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
            </div>
            <div>
              <label className="label">Zip Code:</label>
              <input
                name="zipcode"
                type="number"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
              ></input>
            </div>
            <div>
              <label className="label">Phone:</label>              
              <input
                name="phone"
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></input>
            </div>
              <button type="submit" onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </form>
            {hasSubmitted && validationErrors.length > 0 && (
          <div className="errors">
            The following errors were found:
            <ul>
              {validationErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
          </div>
        )}
      </div>
      <div className="checkout-confirmation">
        <div>
          <div>
            Total:{" "}
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "USD",
            }).format(getTotal())}
          </div>
          <form onSubmit={submitHandler}>
            <button type="submit">Confirm Order</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
