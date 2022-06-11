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
  const [shippingPrice, setShippingPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [images, setImages] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validationErrors.length > 0) {
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
    window.alert("Successful post.");
    history.push("/");
  };

  useEffect(() => {
    const errors = [];
    setValidationErrors(errors);
  }, [title, description, images]);

  const addImages = async (images, product_id) => {
    for (let x = 0; x < images.length; x++) {
      const obj = {
        file: images[x],
        product_id: product_id,
        newFile: true,
      };
      console.log(obj);
      await dispatch(uploadFile(obj));
    }
  };

  return (
    <div className="product__form-container">
      <h3>List Your Furniture:</h3>
      <form className="product__form" onSubmit={handleSubmit}>
        <div>
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
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="product__form-category"
          >
            <option value="0">Choose a Category</option>
            <option value="1">Bedroom</option>
            <option value="2">Dining Room</option>
            <option value="3">Living Room</option>
            <option value="4">Office</option>
            <option value="5">Outdoor</option>
            <option value="6">Other</option>
          </select>

          <div className="product__form-prices">
            <label className="label">Price:</label>
            <input
              class="product_price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            ></input>
            <label className="label">Shipping Price:</label>
            <input
              class="shipping_price"
              type="number"
              value={shippingPrice}
              onChange={(e) => setShippingPrice(e.target.value)}
              required
            ></input>
          </div>
        </div>
        <div className="form_input_section" id="imageUploadSection">
          <div className="field_section_container">
            <h3 className="imagesHeader">Images:</h3>
            <div className="erro_container_div">
              <ul className="erro_container">
                {validationErrors.length > 0 &&
                  validationErrors.map((error) => (
                    <li className="erro" key={error} style={{ color: "red" }}>
                      {error}
                    </li>
                  ))}
              </ul>
            </div>
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
                          <div className="editPhotoButtons">
                            <div
                              className="change_image"
                              onClick={() => onImageUpdate(index)}
                            >
                              Change
                            </div>
                            <div
                              className="remove_image"
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
