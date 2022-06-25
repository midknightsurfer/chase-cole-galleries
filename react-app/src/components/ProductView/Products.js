import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { getProducts } from "../../store/products";
import Slider from "react-slick";
import { useCategory } from "../../context/CategoryContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./ProductView.css";

const Products = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => Object.values(state?.products));
  const { category, setCategory } = useCategory();

  let filteredProducts = products.filter((product) => {
    if (category === 0) {
      return product;
    } else {
      return product.category_id === category;
    }
  });

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToScroll: 2,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: filteredProducts.length < 6 ? filteredProducts.length : 6,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: filteredProducts.length < 5 ? filteredProducts.length : 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: filteredProducts.length < 4 ? filteredProducts.length : 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: filteredProducts.length < 2 ? filteredProducts.length : 2,
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: filteredProducts.length < 1 ? filteredProducts.length : 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="furniture__card-container">
        <Slider {...settings}>
          {filteredProducts.length ? filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          )): <div>No products found</div>}
        </Slider>
      </div>
    </>
  );
};

export default Products;
