import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductId } from "../../store/products";
import { useHistory } from "react-router-dom";

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

  return (
    <div className="furniture__card">
      <div
        className="furniture__card-photo"
        style={{ backgroundImage: `url(${product.images[0]})` }}
      >
        
        {user ? user.id === product.user_id ? (
          <div className="modifyBtns">
            <div
              className="deleteBtn"
              onClick={(e) => setDeleteConfirmation(true)}
            >
              <i class="fa-solid fa-trash-can"></i>
            </div>
            <div className="editBtn" onClick={() => history.push(`/products/edit/${product.id}`)}>
            <i class="fa-solid fa-pen-to-square"></i>
            </div>
          </div>
        ) : (
          ""
        ) : ""}
        {deleteConfirmation && (
          <div className="modal-bg">
            <div className="modal">
              <div className="confirmation__modal">
                <p>Are you sure you want to remove this product?</p>
                <div className="confirmationBtns">
                  <div onClick={() => deleteProduct(product.id)}>Delete</div>
                  <div onClick={() => setDeleteConfirmation(!deleteConfirmation)}>Cancel</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="furniture__card-title">{product.title}</div>
      <div className="furniture__card-price">${product.price}.00</div>
    </div>
  );
};

export default ProductCard;
