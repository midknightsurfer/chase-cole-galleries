import { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, editSold } from "../../store/products";
import { addCart } from "../../store/cart";
import { ModalContext } from "../../context/ModalContext";

import ReactBnbGallery from "react-bnb-gallery";
import "react-bnb-gallery/dist/style.css";

import sold from "../../assets/sold.png";

const ProductView = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const product = useSelector((state) => state.products[productId]);
  let { handleModal, setModal } = useContext(ModalContext);
  const user = useSelector((state) => state.session.user);

  const [photoIndex, setPhotoIndex] = useState(0);
  const [photoObject, setPhotoObject] = useState([]);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    dispatch(getProducts(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const soldBy = users.find((user) => user.id === product?.user_id);

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
    setPhotoIndex(photosIndex);
    setShowPhotoModal(true);
  };

  const addToCart = () => {
    const data = {
      sold: true,
    };

    dispatch(editSold(data, product.id));
    dispatch(addCart(product));

    handleModal(
      <div className="products-card__modalbg">
        <div className="products-card__modal">
          <p>Added to Cart</p>
        </div>
      </div>
    );
    
    setTimeout(() => {
      history.push("/");
      setModal(false);
    }, 3000);
  };

  return (
    <div className="productview__container">
      <div className="productview-image__container">
        <div
          className="productview-image__maincontainer"
          style={{ backgroundImage: `url(${product?.images[0]})` }}
        ></div>
        <div className="productview-image__gallery">
          {product?.images.map((image) => (
            <div
              className="productview-image__container"
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

      <div className="productview-information__container">
        <h2>{product?.title}</h2>
        <h4>
          Sold by: {soldBy?.first_name} {soldBy?.last_name}
        </h4>
        <p>{product?.description}</p>
        <div className="productview-cart__container">
          <h4>Add to Cart</h4>
          <div className="productview-cart">
            {product?.sold === true ? (
              <img src={sold} alt="sold" className="productview-cart__sold" />
            ) : (
              ""
            )}
            <span>
              <h5>Price:</h5>
            </span>
            <span className="productview-cart__prices">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "USD",
              }).format(product?.price)}
            </span>
            <span>
              <h5>Shipping:</h5>
            </span>
            <span className="productview-cart__prices">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "USD",
              }).format(product?.shipping_price)}
            </span>
          </div>
          <hr />
          {user?.id !== product?.user_id ? (
            <button
              onClick={() => addToCart()}
              className="productview-cart__button"
              disabled={product?.sold}
            >
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "USD",
              }).format(product?.price + product?.shipping_price)}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
