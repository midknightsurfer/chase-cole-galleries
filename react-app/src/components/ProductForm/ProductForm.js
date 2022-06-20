import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addProduct, uploadFile } from "../../store/products";
import ImageUploading from "react-images-uploading";

import "./ProductForm.css";

const ProductForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [shippingPrice, setShippingPrice] = useState(null);
  const [categoryId, setCategoryId] = useState(0);
  const [priceValidationErrors, setPriceValidationErrors] = useState([]); 
  const [categoryValidationErrors, setCategoryValidationErrors] = useState([]);  
  const [imgValidationErrors, setImgValidationErrors] = useState([]);
  const [images, setImages] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (price < 1 || shippingPrice < 1) {
      setPriceValidationErrors(["Please enter a value greater than zero!"]);
    }

    if (images.length < 1) {
      setImgValidationErrors(["Please upload at least one picture!"]);
    }

    if (categoryId === 0) {
      setCategoryValidationErrors(["Please choose a valid Category"])
    }

    if (priceValidationErrors.length || imgValidationErrors || categoryValidationErrors.length) {
      return;
    }

    let cleanImages = images.map((image) => image.file);

    const data = {
      user_id: user.id,
      title,
      description,
      category_id: categoryId,
      price,
      shipping_price: shippingPrice,
    };
    const productData = await dispatch(
      addProduct(user.id, title, description, categoryId, price, shippingPrice)
    );

    await addImages(cleanImages, productData[1].id);
    history.push("/");
  };

  const addImages = async (images, product_id) => {
    for (let x = 0; x < images.length; x++) {
      const obj = {
        file: images[x],
        product_id: product_id,
        newFile: true,
      };

      await dispatch(uploadFile(obj));
    }
  };

  return (
    <div className="product__form-container">
      <h2>List Your Furniture</h2>
      <form className="product__form" onSubmit={handleSubmit}>
        <label className="label">Title:</label>
        <input
          name="title"
          type="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        ></input>

        <label className="label">Description:</label>
        <textarea
          className="product__form-description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <label className="label">Category:</label>
        {categoryValidationErrors ? <div className={categoryValidationErrors.length ? "errors" : ""}>{categoryValidationErrors}</div> : ""}
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="product__form-category"
          required
        >
          <option value="0">Choose a Category</option>
          <option value="1">Bedroom</option>
          <option value="2">Dining Room</option>
          <option value="3">Living Room</option>
          <option value="4">Office</option>
          <option value="5">Outdoor</option>
          <option value="6">Other</option>
        </select>

        <label className="label">Price:</label>

        {priceValidationErrors ? <div className={priceValidationErrors.length ? "errors" : ""}>{priceValidationErrors}</div> : ""}
        <input
          className="product_price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        ></input>
        <label className="label">Shipping Price:</label>
        <input
          className="shipping_price"
          type="number"
          value={shippingPrice}
          onChange={(e) => setShippingPrice(e.target.value)}
          required
        ></input>

        <div className="form_input_section" id="imageUploadSection">
          <div className="field_section_container">
            <h3 className="imagesHeader">Images:</h3>
            {imgValidationErrors ? <div className={imgValidationErrors.length ? "errors" : ""}>{imgValidationErrors}</div> : ""}
            <div className="imageUploadContainer">
              <ImageUploading
                multiple
                value={images}
                onChange={(imageList) => setImages(imageList)}
                maxNumber={20}
                dataURLKey="data_url"
                acceptType={["jpg", "png", "jpeg"]}
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  <div className="upload__image-wrapper">
                    <div
                      style={
                        isDragging ? { color: "rgb(192, 53, 22)" } : undefined
                      }
                      onClick={onImageUpload}
                      {...dragProps}
                      className="add_images_container"
                    >
                      Click or Drag Images Here
                    </div>
                    {/* <div onClick={onImageRemoveAll}>Remove all images</div> */}
                    <div className="images_container">
                      {imageList.map((image, index) => (
                        <div key={index}>
                          <img src={image["data_url"]} alt="" height="230" />
                          <div className="modifyBtns">
                            <div
                              className="editBtn"
                              onClick={() => onImageUpdate(index)}
                            >
                              Change
                            </div>
                            <div
                              className="deleteBtn"
                              onClick={() => onImageRemove(index)}
                            >
                              Remove
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </ImageUploading>
            </div>
          </div>

          <div className="product__form-btndiv">
            <button className="product__form-btn" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
