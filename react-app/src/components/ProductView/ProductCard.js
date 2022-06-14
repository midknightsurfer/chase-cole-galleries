import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductId } from "../../store/products";
import { useHistory, Link } from "react-router-dom";

import "./ProductView.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const user = useSelector((state) => state.session.user);

  const deleteProduct = (productId) => {
    dispatch(deleteProductId(productId));
    setDeleteConfirmation(false);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    setDeleteConfirmation(true);
  };

  const handleEditBtn = (e) => {
    e.preventDefault();
    history.push(`/products/edit/${product.id}`)
  }

  return (
    <>
      <Link to={`/products/${product.id}`}>
      <div className="furniture__card">
        <div
          className="furniture__card-photo"
          style={{ backgroundImage: `url(${product.images[0]})` }}
        ></div>

        <div className="furniture__card-title">{product.title}</div>
        <div className="furniture__card-price">${product.price}.00</div>
        {user ? (
          user.id === product.user_id ? (
            <div className="modifyBtns">
              <button className="deleteBtn" onClick={handleButtonClick} title="delete">
                <i class="fa-solid fa-trash-can"></i>
              </button>
              <button
                className="editBtn"
                onClick={handleEditBtn}
                title="edit"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
            </div>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
      </Link>
      {deleteConfirmation && (
        <div className="modal-bg">
          <div className="modal">
            <div className="confirmation__modal">
              <p>Are you sure you want to remove this product?</p>
              <div className="confirmationBtns">
                <div onClick={() => deleteProduct(product.id)}>Delete</div>
                {console.log(product.id)}
                <div onClick={() => setDeleteConfirmation(!deleteConfirmation)}>
                  Cancel
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
