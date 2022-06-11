import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
    <div className="furniture__card-container">
      {products.slice(0, 8).map((product) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
};

export default Products;
