import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductId } from "../../store/products";
import { ModalContext } from "../../context/ModalContext";
import { useHistory, Link } from "react-router-dom";

import "./ProductView.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { handleModal } = useContext(ModalContext);

  const user = useSelector((state) => state.session.user);

  const deleteProduct = (productId) => {
    dispatch(deleteProductId(productId));
    handleModal(<ContentComponent />);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    handleModal(
      <div className="products-card__modalbg">
          <div className="products-card__modal">
            <p>Are you sure you want to remove this product?</p>
            <div className="products-card__modalbtns">
              <button onClick={() => deleteProduct(product.id)}>Delete</button>
              <button onClick={() => handleModal(<ContentComponent />)}>
                Cancel
              </button>
            </div>
        </div>
      </div>
    );
  };

  const handleEditBtn = (e) => {
    e.preventDefault();
    history.push(`/products/edit/${product.id}`);
  };

  return (
    <>
      <Link to={`/products/${product.id}`}>
        <div className="products-card">
          <div
            className="products-card__photo"
            style={{ backgroundImage: `url(${product.images[0]})` }}
          ></div>

          <div className="products-card__title">{product.title}</div>
          <div className="products-card__price">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(product.price)}</div>
          {user ? (
            user.id === product.user_id ? (
              <div className="products-card__modifybtns">
                <div
                  className="delete-btn"
                  onClick={handleButtonClick}
                  title="delete"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </div>
                <div className="edit-btn" onClick={handleEditBtn} title="edit">
                  <i className="fa-solid fa-pen-to-square"></i>
                </div>
              </div>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
      </Link>
    </>
  );
};

export default ProductCard;

function ContentComponent() {
  return <></>;
}
