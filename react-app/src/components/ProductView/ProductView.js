import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import ReactBnbGallery from "react-bnb-gallery";

import "react-bnb-gallery/dist/style.css";

const ProductView = () => {
  const { productId } = useParams();

  const product = useSelector((state) => state.products[productId]);

  const [photoIndex, setPhotoIndex] = useState(0);
  const [photoObject, setPhotoObject] = useState([]);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

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


  return (
    <div className="productview__container">
      <div className="productview__images-container">
      <div className="productview__img-maincontainer" style={{backgroundImage: `url(${product.images[0]})`}}>
      </div>
      <div className="productview__img-gallery">
          {product.images.map(image => (
            <div className="productview__image-container" onClick={() => handlePhotos()} style={{backgroundImage: `url(${image})`}}>           
            </div>
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
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <h5>Price: ${product.price}.00</h5>
        <h5>Shipping: ${product.shipping_price}.00</h5>
      </div>

    </div>
  )
}

export default ProductView