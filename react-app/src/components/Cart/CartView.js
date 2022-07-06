import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { ModalContext } from "../../context/ModalContext";
import CartItem from "./CartItem";
import { clear } from "../../store/cart";
import { editSold } from "../../store/products";

const CartView = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { setModal } = useContext(ModalContext);

  const cartTotal = useSelector((state) => Object.values(state.cart.cartTotal));
  const cartProducts = useSelector((state) =>
    Object.values(state.cart.products)
  );

  const getTotal = () => {
    const inital = 0;
    const myCartTotal = cartTotal.reduce((accum, curr) => accum + curr, inital);
    return myCartTotal;
  };

  const clearCart = () => {
    const data = {
      sold: false,
    };

    cartProducts?.map((product) =>
      dispatch(editSold(data, product.product_id)).then(
        dispatch(clear(product.id))
      )
    );
  };

  const handleCheckout = () => {
    history.push("/checkout");
    setModal(false);
  };

  return (
    <div className="main-menu__bg">
      <i
        className="cart-close fas fa-times"
        onClick={() => setModal(false)}
      ></i>
      <div className="cart-container">
        <div className="cart-item__container">
          <h3>Cart</h3>
          {cartProducts && cartProducts.length ? (
            cartProducts?.map((product) => {
              return (
                <div key={product.id}>
                  <CartItem product={product} />
                </div>
              );
            })
          ) : (
            <h4>Your Cart is Currently Empty</h4>
          )}{" "}
          {window.location.pathname !== "/checkout" ? (
            cartProducts.length ? (
              <div className="cart-checkout">
                <div className="cart-checkout__total">
                  <span>Total: </span>
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "USD",
                  }).format(getTotal())}
                </div>

                <div className="cart-checkout__btn">
                  <NavLink to="/checkout" exact={true}>
                    <button onClick={handleCheckout} type="submit">
                      Checkout
                    </button>
                  </NavLink>
                  <button onClick={clearCart}>Clear Cart</button>
                </div>
              </div>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default CartView;
