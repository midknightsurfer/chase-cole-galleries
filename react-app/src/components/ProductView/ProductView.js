import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../store/products";
import ReactBnbGallery from "react-bnb-gallery";
import { addCart } from "../../store/cart";

import "react-bnb-gallery/dist/style.css";

const ProductView = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) => state.products[productId]);
  const cart = (useSelector((state)=>state.cart))

  const [photoIndex, setPhotoIndex] = useState(0);
  const [photoObject, setPhotoObject] = useState([]);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  useEffect(() => {
    dispatch(getProducts(productId));
  }, [dispatch]);

  const handlePhotos = (photosIndex) => {
    if (!photoObject.length) {
      const productImages = [];

      for (let i = 0; i < product?.images.length; i++) {
        productImages.push({
          photo: product?.images[i],
          caption: product?.name,
        });
      }
      setPhotoObject(productImages);
    }
    setPhotoIndex(photoIndex);
    setShowPhotoModal(true);
  };

  const addToCart = () => {
    const currProduct = Object.values(cart.products)
    let inCart = false
    for (let i = 0; i < currProduct.length; i++ ){

        if (currProduct[i].product_id === product.id){
            inCart = true
            console.log(i)
        }
    }
        dispatch(addCart(product))
        alert("Added to Cart")

}

  return (
    <div className="productview__container">
      <div className="productview__images-container">
        <div
          className="productview__img-maincontainer"
          style={{ backgroundImage: `url(${product?.images[0]})` }}
        ></div>
        <div className="productview__img-gallery">
          {product?.images.map((image) => (
            <div
              className="productview__image-container"
              onClick={() => handlePhotos()}
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          ))}
        </div>
        <ReactBnbGallery
          show={showPhotoModal}
          onClose={() => setShowPhotoModal(false)}
          photos={photoObject}
          activePhotoIndex={photoIndex}
        />
      </div>

      <div className="productview__information-container">
        <h2>{product?.title}</h2>
        <p>{product?.description}</p>
        <div className="add_to_cart_container">
          <h4>Add to Cart</h4>
          <div className="add_to_cart_grid">
            <span>
              <h5>Price:</h5>
            </span>
            <span className="prices">${product?.price}.00</span>
            <span>
              <h5>Shipping:</h5>
            </span>
            <span className="prices">${product?.shipping_price}.00</span>
          </div>
          <hr />
          <button onClick={() => addToCart()} className="total_button">${product?.price + product?.shipping_price}.00</button>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
