import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { getProducts } from "../../store/products";

import "./ProductView.css";

const Products = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => Object.values(state?.products));

  products.sort(function (a, b) {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
    <div className="furniture__card-container">
      {products.slice(0, 8).map((product) => (
          <ProductCard product={product} />            
      ))}
    </div>
    <div className="products__description">
    <h2>Exclusive High End Furniture</h2>    
        <p>Welcome to Chase Cole Galleries! Your one stop shop for hard to find and classic Furniture! Many of our products are designed by the artist Bob Timberlake and were once offered by Lexington Furniture. The pieces on this site are not your usual cheap particle board furniture that your normally find at other venues; they are expertly crafted, made to last, precision pieces that will light up your home. Feel free to create an account and browse our inventory. Also note that shipping on all these items will take awhile and be a bit more expensive than shipping with a large retail company because we use high end, private shippers and wrap your items with care to protect them on their journey.</p>
    </div>
    </>

  );
};

export default Products;
