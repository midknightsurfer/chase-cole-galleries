import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/products";
import updateUser from "../../store/user";
import ProductCard from "../ProductView/ProductCard";

const MyAccount = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session.user);
  const products = useSelector((state) => Object.values(state?.products));

  const [showShipping, setShowShipping] = useState(true);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [address, setAddress] = useState(user.address);
  const [state, setState] = useState(user.state);
  const [city, setCity] = useState(user.city);
  const [zipcode, setZipcode] = useState(user.zipcode);
  const [phone, setPhone] = useState(user.phone);

  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const editShipping = () => {
    setShowShipping(!showShipping);
    setShowShippingForm(!showShippingForm);
  };

  useEffect(() => {
    const errors = [];
    setHasSubmitted(false);
    if (!address) {
      errors.push("Address : This field is required");
    }
    if (!state) {
      errors.push("State : This field is required");
    }
    if (!city) {
      errors.push("City : This field is required");
    }
    if (!zipcode) {
      errors.push("Zip Code : This field is required");
    }
    if (zipcode && (zipcode.length > 5 || zipcode.length < 5)) {
      errors.push("Zip Code : Zip Code must be 5 digits");
    }
    if (!phone) {
      errors.push("Phone : This field is required");
    }
    if (phone && phone.length !== 10) {
      errors.push("Phone : Phone must be 10 digits");
    }
    setValidationErrors(errors);
  }, [address, city, state, zipcode, phone, showShippingForm]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleSave = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    if (validationErrors.length) return;

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
  };

  return (
    <>
      <h2>My Account</h2>
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
              City: {city} State: {state} Zip Code: {zipcode}
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
              <button type="submit" onClick={handleSave}>
                Save
              </button>
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
      <div className="myaccount-card__container">
        <h3>My current Listings</h3>
        <div className="myaccount-card__grid">
          {products.length ? (
            products?.map(
              (product) =>
                product?.user_id === user?.id && (
                  <ProductCard key={product?.id} product={product} />
                )
            )
          ) : (
            <div>No products found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyAccount;
