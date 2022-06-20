import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import CartItem from "./CartItem";
import { clear } from "../../store/cart";

const CartView = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const cartTotal = useSelector((state) => state.cart.cartTotal);
  const [isLoaded, setIsLoaded] = useState(false);
  const cartProducts = useSelector((state) => state.cart.products);

  const getTotal = () => {
    const inital = 0;
    const myCartTotal = Object.values(cartTotal).reduce(
      (accum, curr) => accum + curr,
      inital
    );
    return myCartTotal;
  };

  const clearCart = () => {
    Object.values(cartProducts)?.map((product) => dispatch(clear(product.id)));
  };

  useEffect(() => {
    setIsLoaded(true);
  }, [dispatch, cartTotal]);

  return (
    isLoaded && (
      <div className="cart__item-container">
        <h3>Cart</h3>

        {cartProducts && Object.values(cartProducts).length ? (
          Object.values(cartProducts)?.map((product) => {
            return (
              <div key={product.id}>
                <CartItem product={product} />
              </div>
            );
          })
        ) : (
          <h4>Your Cart is Currently Empty</h4>
        )} {window.location.pathname !== '/checkout' ? 
        <div className="cart__checkout">
          <div className="cart__checkout-total">
            <span>Total: </span>
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "USD",
            }).format(getTotal())}
          </div>

          <div className="cart__checkout-btn">
            <button onClick={() => history.push('/checkout')} type="submit">
              Checkout
            </button>

            <button className="center" onClick={clearCart}>Clear Cart</button>
          </div>

        </div>
          : "" }
      </div>
    )
  );
};

export default CartView;
