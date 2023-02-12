import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFavorites } from "../../store/favorites";
import ProductCard from "../ProductView/ProductCard";
import { getProducts } from "../../store/products";

const MyFavorites = () => {
  const dispatch = useDispatch();

  const userFavorite = useSelector(state => Object.values(state.favorites))
  const user = useSelector((state) => state.session.user);
  const products = useSelector((state) => Object.values(state?.products));
  
  useEffect(() => {
    dispatch(getFavorites(user?.id))
    dispatch(getProducts());
}, [dispatch ,user])

console.log(userFavorite)

  return (
    <div>
      <h1>My Favorites</h1>
      <div className="products__card-container">
      {userFavorite ? userFavorite.map((favorite) => (
        products.map((product) => (
        favorite.product_id === product.id ? ( 
          <ProductCard key={product.id} product={product} />
          ) : null
        )))
      ) : null}
      </div>
    </div>
  )
}

export default MyFavorites