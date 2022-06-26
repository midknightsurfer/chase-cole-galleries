import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { getProducts } from "../../store/products";
import Slider from "react-slick";
import { useCategory } from "../../context/CategoryContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./ProductView.css";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#fd576b", borderRadius: "80px" }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#fd576b", borderRadius: "80px" }}
      onClick={onClick}
    />
  );
}

const Products = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => Object.values(state?.products));
  const { category } = useCategory();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

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
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 4000,
        settings: {
          slidesToShow: filteredProducts.length < 7 ? filteredProducts.length : 7,
        },
      },      
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
          arrows: false,
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: filteredProducts.length < 1 ? filteredProducts.length : 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <>
      <div className="products-card__container">
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
