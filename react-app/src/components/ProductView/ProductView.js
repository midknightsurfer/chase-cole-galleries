import React from 'react';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

const ProductView = () => {
  const { productId } = useParams();

  const product = useSelector((state) => state.products[productId]);




  return (
    <div className="productview__container">
      <div className="productview__images-container">
      <div className="productview__img-maincontainer" style={{backgroundImage: `url(${product.images[0]})`}}>
      </div>
      <div className="productview__img-gallery">
          {product.images.map(image => (
            <div className="productview__image-container" style={{backgroundImage: `url(${image})`}}>           
            </div>
          ))}
      </div>        
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