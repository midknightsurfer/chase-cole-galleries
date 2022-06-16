import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';

const CartView = () => {
  const dispatch = useDispatch()

  const user = useSelector((state)=> state.session.user)
  const cartTotal = useSelector((state=>state.cart.cartTotal))
  const [isLoaded, setIsLoaded] = useState(false)
  const cartProducts = (useSelector((state) => state.cart.products))

  const getTotal = () => {
    const inital = 0
    const myCartTotal = Object.values(cartTotal).reduce(
        (accum, curr) => accum + curr,
        inital
    )
    return myCartTotal
}

  useEffect(() => {
    setIsLoaded(true);
  }, [dispatch, cartTotal]);

  return (
    isLoaded && (
      <div className="cart__item-container">
        <h3>Cart</h3>
        {Object.values(cartProducts)?.map((product) => {
          return (
            <div key={product.id}>
              <CartItem product={product} total={getTotal()} />
            </div>
          )
        })}

      </div>
    )
  )
}

export default CartView